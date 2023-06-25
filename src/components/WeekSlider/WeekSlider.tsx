'use client';
import { FC, useState, useEffect, useCallback, useRef, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

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
import { formatDay, formatDate, formatFullDate } from '@/utils/formatDate';

import globalStyles from '@/styles/global';
import LoadingAnimation from '../Animations/LoadingAnimation';

interface IVisitData {
	id?: string;
	date: string;
	hour: string;
	employee: string;
	service: string;
	time: number;
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
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(true);
	const [calendar, setCalendar] = useState<Date[]>([]);
	const [visits, setVisits] = useState<IVisitData[]>();
	const [accessibleVisits, setAccessibleVisits] = useState<string[]>();
	const [choiceModal, setChoiceModal] = useState<boolean>(false);
	const [currentFullDate, setCurrentFullDate] = useState<string>('');
	const [visitData, setVisitData] = useState<IVisitData>({
		date: '10 Jun 2023',
		hour: '',
		employee: '',
		service: '',
		time: 0,
	});
	const [allEmployees, setAllEmployees] = useState<IAdminData[]>();
	const [servicesItems, setServicesItems] = useState<IServicesItem[]>();
	const [selectedEmployeeError, setSelectedEmployeeError] = useState<boolean>(false);
	const visitDataRef = useRef<IVisitData>(visitData);

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

	const handleDate = (selectedDate: Date) => selectedDate.toDateString();

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

		return currentDate.toDateString();
	};

	const getVisits = async (date: string) => {
		console.log(date);
		const visits = await fetchVisits({ date });
		setVisits(visits);

		const bookedVisits: string[] = [];

		visits.map((el: IVisitData) => {
			bookedVisits.push(allVisitsHour.filter((hour) => hour === el.hour).toString());
			if (el.time === 60) {
				bookedVisits.push(allVisitsHour[allVisitsHour.findIndex((hour) => hour === el.hour) + 1]);
			}
		});

		setAccessibleVisits(allVisitsHour.filter((hour) => !bookedVisits.includes(hour)));

		setLoading(false);
	};

	const choiceEmployee = async (hour: string) => {
		setVisitData((prevState) => ({ ...prevState, hour }));
		const bookedVisits = await fetchVisits({ date: visitData.date.slice(4, 15), hour });
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

	const getSelectedEmployee = (employee: string) => {
		setVisitData((prevState) => ({ ...prevState, employee }));
	};

	const selectService = (e: MouseEvent<HTMLButtonElement>) => {
		document.body.classList.remove('overflow-hidden');
		const updatedService = e.currentTarget?.dataset?.service || '';
		setVisitData((prevState) => ({
			...prevState,
			service: updatedService,
		}));

		if (visitDataRef.current.employee === '') {
			setSelectedEmployeeError(true);
		} else {
			sessionStorage.setItem('visit-data', JSON.stringify(visitDataRef.current));
			if (sessionStorage.getItem('auth-token')) {
				router.push('/podsumowanie');
			} else {
				router.push('/logowanie');
			}
		}
	};

	useEffect(() => {
		getVisits('Jun 26 2023');
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
		visitDataRef.current = visitData;
	}, [visitData]);

	useEffect(() => {
		generateCalendar();
		setVisitData((prevState) => ({ ...prevState, date: handleCurrentDate() }));
	}, [generateCalendar]);

	return (
		<>
			{loading ? (
				<LoadingAnimation label='Wczytywanie' />
			) : (
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
									data-date={el.toDateString().substring(4, 15)}
									className={`${
										handleDate(el) === visitData.date
											? 'bg-primary text-white text-center'
											: 'hover:bg-neutral-100 dark:hover:bg-gray-700'
									} mx-2 w-16 text-center flex-shrink-0 rounded-lg`}
									onClick={() => {
										setVisitData((prevState) => ({ ...prevState, date: el.toDateString() }));
										getVisits(el.toDateString().substring(4, 15));
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
									<div>
										<div className='flex'>
											{allEmployees &&
												allEmployees.map((el, index) => (
													<EmployeeChoiceButton
														key={index}
														firstName={el.firstName}
														getSelectedEmployee={(employee) => getSelectedEmployee(employee)}
													/>
												))}
										</div>
										<div className={`${selectedEmployeeError ? '' : 'invisible'} flex items-center text-red-600 my-2`}>
											<svg
												aria-hidden='true'
												className='flex-shrink-0 inline w-5 h-5 mr-1.5'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													fill-rule='evenodd'
													d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
													clip-rule='evenodd'
												></path>
											</svg>
											<p>Wybierz pracownika</p>
										</div>
									</div>
								</div>
								<div className='mb-4'>
									<h3 className={globalStyles.h3}>Wybierz usługę:</h3>
									{servicesItems?.map((el, index) => (
										<div
											key={index}
											data-name={el.name}
											className='flex justify-between border rounded-lg my-4 px-2 py-4 dark:border-gray-700'
										>
											<div className='ml-3'>
												<p>{el.name}</p>
												<p className='text-sm text-gray-800 dark:text-gray-400'>{el.time} minut</p>
											</div>
											<div className='flex flex-col items-end'>
												<p className='mr-3 text-lg font-bold text-primary'>{el.price} PLN</p>
												<button
													type='button'
													className={globalStyles.buttonPrimary}
													data-service={el.name}
													onClick={selectService}
												>
													Umów
												</button>
											</div>
										</div>
									))}
								</div>
							</Modal>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default WeekSlider;
