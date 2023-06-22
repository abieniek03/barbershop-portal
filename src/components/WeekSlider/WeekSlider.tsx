import { FC, useState, useEffect, useCallback, MouseEvent } from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

import { useStoreDispatch, useStoreSelector } from '@/store/store';
import { fetchUserData } from '@/store/features/userSlice';

import Modal from '../Modals/Modal';
import EmployeeChoiceButton from '../Buttons/EmployeeChoiceButton';
import { LuX } from 'react-icons/lu';

import fetchVisits from '@/utils/fetch/fetchVisits';
import fetchServices from '@/utils/fetch/fetchServices';
import axios from '@/axiosInstance';

import { IUserData } from '@/store/features/userSlice';
import { IServicesItem } from '@/components/Sections/OfferSection';

import globalStyles from '@/styles/global';

interface IVisits {
	date: string;
	employee: string;
	id: string;
	name: string;
	time: string;
	userID: string;
}

interface IVisitData {
	date: string;
	hour: string;
	employee: string;
	service: string;
}

interface IAdminData {
	id?: string;
	email: string;
	firstName?: string;
	lastName?: string;
	password?: string;
	passwordRepeat?: string;
	rank: string;
}

const WeekSlider: FC<{ view: string }> = ({ view }) => {
	const [calendar, setCalendar] = useState<Date[]>([]);
	const [visits, setVisits] = useState<IVisits[]>();
	const [accessibleVisits, setAccessibleVisits] = useState<string[]>();
	const [choiceModal, setChoiceModal] = useState<boolean>(false);
	const [currentFullDate, setCurrentFullDate] = useState<string>('');
	const [visitData, setVisitData] = useState<IVisitData>({
		date: '10 Jun 2023',
		hour: '',
		employee: '',
		service: '',
	});
	const [allEmployees, setAllEmployees] = useState<IAdminData[]>();
	const [servicesItems, setServicesItems] = useState<IServicesItem[]>();

	const dispatch = useStoreDispatch();
	const user = useStoreSelector((store: IUserData) => store.user);

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

	const formatDay = (date: Date) => {
		return format(date, 'EEE', { locale: pl });
	};

	const formatDate = (date: Date) => {
		return format(date, 'dd', { locale: pl });
	};

	const formatFullDate = (date: Date) => {
		return format(date, 'EEEE, do MMMM yyyy', { locale: pl });
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

	const getVisits = async (date: string) => {
		const visits = await fetchVisits({ date });
		setVisits(visits);
		setAccessibleVisits(allVisitsHour.filter((hour) => visits.filter((el: IVisits) => el.time === hour).length !== 2));
	};

	const choiceEmployee = async (hour: string) => {
		setVisitData((prevState) => ({ ...prevState, hour }));
		const bookedVisits = await fetchVisits({ date: visitData.date.slice(5, 16), time: hour });
		console.log(bookedVisits);
		setChoiceModal(true);
		document.body.classList.add('overflow-hidden');
	};

	const closeChoceModal = () => {
		setChoiceModal(false);
		document.body.classList.remove('overflow-hidden');
	};

	const fetchEmployees = () => {
		axios
			.get('/employees')
			.then((res) => {
				const employees: IAdminData[] = Object.values(res.data); // Zamiana obiektu na tablicę
				setAllEmployees(employees);
			})
			.catch(() => {
				const errorInfo = 'Nie znaleziono';
				return errorInfo;
			});
	};

	useEffect(() => {
		getVisits('21 Jun 2023');
		console.log('siema');
		fetchEmployees();

		const fetchOfferItems = async () => {
			try {
				const data = await fetchServices();
				setServicesItems(data);
			} catch (error) {
				console.error('Błąd podczas pobierania usług:', error);
			}
		};

		fetchOfferItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setCurrentFullDate(formatFullDate(new Date(visitData.date)));
	}, [visitData.date]);

	useEffect(() => {
		generateCalendar();
		setVisitData((prevState) => ({ ...prevState, date: handleCurrentDate() }));
	}, [generateCalendar]);

	return (
		<div>
			<p onClick={handleCurrentDate}>ELO</p>
			<p onClick={() => fetchVisits({ date: '19 Jun 2023' })}>fetch</p>
			<div>
				<p className='text-gray-800 dark:text-neutral-300 text-center text-lg  font-bold'>
					{monthsNames[new Date(visitData.date).getMonth()]}
				</p>
				<div className='flex overflow-x-scroll cursor-pointer mt-3'>
					{calendar.map((el, index) => (
						<div
							key={index}
							data-date={el.toUTCString().substring(5, 16)}
							className={`${
								handleUTC(el) === visitData.date
									? 'bg-primary text-white text-center'
									: 'hover:bg-neutral-100 dark:hover:bg-gray-700'
							} mx-2 w-16 text-center flex-shrink-0 rounded-lg`}
							onClick={() => {
								setVisitData((prevState) => ({ ...prevState, date: el.toUTCString() }));
								getVisits(el.toUTCString().substring(5, 16));
							}}
						>
							<p>{formatDay(el).split('.')[0]}</p>
							<p>{formatDate(el)}</p>
						</div>
					))}
				</div>
			</div>
			{view === 'admin' ? (
				<>
					<div>
						<h1>tu coś się zrobi</h1>
					</div>
				</>
			) : (
				<>
					<div className='w-full flex flex-wrap justify-center mx-auto py-4'>
						{accessibleVisits &&
							accessibleVisits.map((el, index) => (
								<button
									onClick={(e: MouseEvent<HTMLButtonElement>) => choiceEmployee(e.currentTarget.textContent || '')}
									type='button'
									key={index}
									className={`${globalStyles.buttonSecondary} mb-2 mr-2 mp-2 `}
								>
									{el}
								</button>
							))}
					</div>

					<Modal title='Szczegóły wizyty' visible={choiceModal} addStyles='w-3/4 max-w-screen-md'>
						<button onClick={closeChoceModal} className='absolute text-2xl top-6 right-6'>
							<LuX className='text-neutral-100' />
						</button>
						<div className='mb-4'>
							<p className='mb-3'>
								Termin: {currentFullDate}, {visitData.hour}
							</p>
							<h3 className={globalStyles.h3}>Wybierz pracownika:</h3>
							<div className='flex'>
								{allEmployees &&
									allEmployees.map((el, index) => <EmployeeChoiceButton key={index} firstName={el.firstName} />)}
							</div>
						</div>
						<div className='mb-4'>
							<h3 className={globalStyles.h3}>Wybierz usługę:</h3>
							{servicesItems?.map((el, index) => (
								<div key={index} className='flex justify-between border rounded-lg my-4 px-2 py-4 dark:border-gray-700'>
									<div className='ml-3'>
										<p>{el.name}</p>
										<p className='text-sm text-gray-800 dark:text-gray-400'>{el.time} minut</p>
									</div>
									<div className='flex flex-col items-end'>
										<p className='mr-3 text-lg font-bold text-primary'>{el.price} PLN</p>
										<button className={globalStyles.buttonPrimary}>Umów</button>
									</div>
								</div>
							))}
						</div>
					</Modal>
				</>
			)}
		</div>
	);
};

export default WeekSlider;
