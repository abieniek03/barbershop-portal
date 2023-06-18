import { FC, useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

import fetchVisits from '@/utils/fetch/fetchVisits';

const WeekSlider: FC = () => {
	const [calendar, setCalendar] = useState<Date[]>([]);
	const [selectedDate, setSelectedDate] = useState<string>();
	const [date] = useState(new Date());

	const formatMonth = [
		'Styczeń',
		'Luty',
		'Marzec',
		'Kwiecień',
		'Maj',
		'Czerwiec',
		'Lipiec',
		'Sierpień',
		'Wrzesień',
		'Październik',
		'Listopad',
		'Grudzień',
	];

	const formatDay = (date: Date) => {
		return format(date, 'EEE', { locale: pl });
	};

	const formatDate = (date: Date) => {
		return format(date, 'dd', { locale: pl });
	};

	const generateCalendar = useCallback(() => {
		const tempCalendar: Date[] = [];

		const currentDate = new Date(date);

		while (tempCalendar.length < 15) {
			const dayOfWeek = currentDate.getDay();

			if (dayOfWeek !== 6 && dayOfWeek !== 0) {
				tempCalendar.push(new Date(currentDate));
			}

			currentDate.setDate(currentDate.getDate() + 1);
		}

		setCalendar(tempCalendar);
	}, [date]);

	const handleUTC = (selectedDate: Date) => selectedDate.toUTCString();

	const handleCurrentDate = () => {
		let currentDate = new Date();

		// switch from saturday to monday
		if (currentDate.getDay() === 6) {
			currentDate.setDate(currentDate.getDate() + 2);
		}

		// switch from sunday to monday
		if (currentDate.getDay() === 0) {
			currentDate.setDate(currentDate.getDate() + 1);
		}

		return currentDate.toUTCString();
	};

	useEffect(() => {
		fetchVisits({ date: '19 Jun 2023' });
	}, []);

	useEffect(() => {
		generateCalendar();

		setSelectedDate(handleCurrentDate());
	}, [generateCalendar]);

	return (
		<div>
			<p onClick={handleCurrentDate}>ELO</p>
			<p onClick={() => fetchVisits({ date: '19 Jun 2023' })}>fetch</p>
			<div>
				<p className='text-gray-800 dark:text-neutral-300 text-center text-lg  font-bold'>
					{formatMonth[date.getMonth()]}
				</p>
				<div className=' flex overflow-x-scroll cursor-pointer mt-3'>
					{calendar.map((el, index) => (
						<div
							key={index}
							data-date={el.toUTCString().substring(5, 16)}
							className={`${
								handleUTC(el) === selectedDate
									? 'bg-primary text-white text-center'
									: 'hover:bg-neutral-100 dark:hover:bg-gray-700'
							} mx-2 w-16 text-center flex-shrink-0 rounded-lg`}
							onClick={() => {
								setSelectedDate(el.toUTCString());
								fetchVisits({ date: el.toUTCString().substring(5, 16) });
							}}
						>
							<p>{formatDay(el).split('.')[0]}</p>
							<p>{formatDate(el)}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default WeekSlider;
