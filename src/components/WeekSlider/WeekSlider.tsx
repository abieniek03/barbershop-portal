import { FC, useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

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

		for (let i = 0; i < 14; i++) {
			tempCalendar.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}

		setCalendar(tempCalendar);
	}, [date]);

	const handleUTC = (selectedDate: Date) => selectedDate.toUTCString();

	const handleCurrentDate = () => {
		const currentDate = new Date();
		return currentDate.toUTCString();
	};

	useEffect(() => {
		generateCalendar();
		setSelectedDate(handleCurrentDate());
	}, [generateCalendar]);

	return (
		<div>
			<div>
				<p className='text-center text-lg  font-bold'>{formatMonth[date.getMonth() - 1]}</p>
				<div className=' flex overflow-x-scroll cursor-pointer mt-3'>
					{calendar.map((el, index) => (
						<div
							key={index}
							className={`${
								handleUTC(el) === selectedDate
									? 'bg-primary text-center'
									: 'hover:bg-neutral-100 dark:hover:bg-gray-900'
							} mx-2 w-16 text-center flex-shrink-0 rounded-lg`}
							onClick={() => setSelectedDate(el.toUTCString())}
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
