import { FC, useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

import fetchVisits from '@/utils/fetch/fetchVisits';

import globalStyles from '@/styles/global';

interface IVisits {
	date: string;
	employee: string;
	id: string;
	name: string;
	time: string;
	userID: string;
}

const WeekSlider: FC<{ view: string }> = ({ view }) => {
	const [calendar, setCalendar] = useState<Date[]>([]);
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [visits, setVisits] = useState<IVisits[]>();
	const [accessibleVisits, setAccessibleVisits] = useState<string[]>();
	// const [selectedEmployee, setSelectedEmployee] = useState<string>('any');

	const [date] = useState(new Date());

	const monthsNames = [
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

	const allVisitsHour: string[] = [
		'10:00',
		'10:30',
		'11:00',
		'11:30',
		'12:00',
		'12:30',
		'13:00',
		'13:30',
		'14:00',
		'14:30',
		'15:00',
		'15:30',
		'16:00',
		'16:30',
		'17:00',
		'17:30',
	];

	const getVisits = async (date: string) => {
		const visits = await fetchVisits({ date });
		setVisits(visits);
		setAccessibleVisits(allVisitsHour.filter((hour) => !visits.some((el: any) => el.time === hour)));
		console.log('visits - ' + visits);
		console.log(visits);
		console.log(accessibleVisits);
	};

	useEffect(() => {
		getVisits('21 Jun 2023');
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					{monthsNames[new Date(selectedDate).getMonth()]}
				</p>
				<div className='flex overflow-x-scroll cursor-pointer mt-3'>
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
								getVisits(el.toUTCString().substring(5, 16));
							}}
						>
							<p>{formatDay(el).split('.')[0]}</p>
							<p>{formatDate(el)}</p>
						</div>
					))}
				</div>
			</div>

			<div className='w-full flex flex-wrap justify-center mx-auto py-4'>
				{accessibleVisits &&
					accessibleVisits.map((el, index) => (
						<button
							onClick={() => {
								console.log(selectedDate);
								console.log('kliknięto!😎');
							}}
							type='button'
							key={index}
							className={`${globalStyles.buttonSecondary} mb-2 mr-2 mp-2 `}
						>
							{el}
						</button>
					))}
			</div>
		</div>
	);
};

export default WeekSlider;
