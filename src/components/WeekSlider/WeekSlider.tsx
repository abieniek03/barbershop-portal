'use client';
import { FC, useState, useEffect, useCallback, useRef, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

import { useStoreSelector } from '@/store/store';

import Modal from '../Modals/Modal';
import { LuX, LuArrowLeft, LuArrowRight, LuUser } from 'react-icons/lu';

import fetchVisits from '@/utils/fetch/fetchVisits';
import fetchServices from '@/utils/fetch/fetchServices';

import { IUserData } from '@/store/features/userSlice';
import { IServicesItem } from '@/components/Sections/OfferSection';
import { formatDay, formatDate, formatFullDate } from '@/utils/formatDate';

import globalStyles from '@/styles/global';
import LoadingAnimation from '../Animations/LoadingAnimation';

export interface IVisitData {
	id?: string;
	userID: string;
	userFullName: string;
	date: string;
	hour: string;
	service: string;
	time: number;
}

const stylesArrowButton =
	'absolute z-0 top-[70px] bg-neutral-100 dark:bg-gray-700 text-primary dark:text-white text-4xl p-2 rounded-full';

const WeekSlider: FC<{ view: string }> = ({ view }) => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(true);
	const [calendar, setCalendar] = useState<Date[]>([]);
	const [visits, setVisits] = useState<IVisitData[]>();
	const [accessibleVisits, setAccessibleVisits] = useState<string[]>();
	const [choiceModal, setChoiceModal] = useState<boolean>(false);
	const [currentFullDate, setCurrentFullDate] = useState<string>('');
	const [visitData, setVisitData] = useState<IVisitData>({
		userID: '',
		userFullName: '',
		date: '10 Jun 2023',
		hour: '',
		service: '',
		time: 0,
	});
	const [servicesItems, setServicesItems] = useState<IServicesItem[]>();

	const visitDataRef = useRef<IVisitData>(visitData);

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

	const horizontalScroll = (direction: string) => {
		const container = document.querySelector('#elo');
		if (container) {
			if (direction === 'right') {
				container.scrollBy(200, 0);
			} else {
				container.scrollBy(-200, 0);
			}
		}
	};

	const handleDate = (selectedDate: Date) => selectedDate.toDateString().substring(4, 15);

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

		return currentDate.toDateString().substring(4, 15);
	};

	const getVisits = async (date: string) => {
		const visits = await fetchVisits({ date });
		setVisits(visits);

		const bookedVisitsHour: string[] = [];
		visits.forEach((el: IVisitData) => {
			bookedVisitsHour.push(allVisitsHour.filter((hour) => hour === el.hour).toString());
			if (el.time === 60) {
				bookedVisitsHour.push(allVisitsHour[allVisitsHour.findIndex((hour) => hour === el.hour) + 1].toString());
			}
		});

		const freeHours = allVisitsHour.filter((hour) => !bookedVisitsHour.includes(hour));

		setAccessibleVisits(freeHours);
		setLoading(false);
	};

	const choiceHour = (hour: string) => {
		setVisitData((prevState) => ({ ...prevState, hour }));
		setChoiceModal(true);

		document.body.classList.add('overflow-hidden');
	};

	const closeChoceModal = () => {
		setChoiceModal(false);
		document.body.classList.remove('overflow-hidden');
	};

	const selectService = async (e: MouseEvent<HTMLElement>) => {
		document.body.classList.remove('overflow-hidden');
		const service = e.currentTarget.getAttribute('data-service') || '';
		const time = Number(e.currentTarget.getAttribute('data-time'));

		setVisitData((prevState) => ({
			...prevState,
			userFullName: `${user.firstName} ${user.lastName}`,
			service,
			time,
		}));

		if (sessionStorage.getItem('auth-token')) {
			router.push('/podsumowanie');
		} else {
			router.push('/logowanie');
		}
	};

	useEffect(() => {
		getVisits(handleCurrentDate());

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
		sessionStorage.setItem('visit-data', JSON.stringify(visitData));
	}, [visitData]);

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
				<div className='mt-8'>
					<LoadingAnimation label='Wczytywanie' />
				</div>
			) : (
				<div>
					<div>
						<div className='relative z-0'>
							<button>
								<LuArrowLeft
									className={`${stylesArrowButton} -left-6 lg:-left-10`}
									onClick={() => horizontalScroll('left')}
								/>
								<LuArrowRight
									className={`${stylesArrowButton} -right-6 lg:-right-10`}
									onClick={() => horizontalScroll('right')}
								/>
							</button>
						</div>
						<p className='text-gray-800 dark:text-neutral-300 text-center text-lg font-bold'>
							{monthsNames[new Date(visitData.date).getMonth()]}
						</p>
						<div className='flex overflow-hidden cursor-pointer pb-3 mt-3 border-b border-gray-200 dark:border-gray-600 scroll-smooth'>
							{calendar.map((el, index) => (
								<button
									key={index}
									data-date={el.toDateString().substring(4, 15)}
									className={`${
										handleDate(el) === visitData.date
											? 'bg-primary text-white text-center'
											: 'hover:bg-neutral-100 dark:hover:bg-gray-700'
									} mx-2 w-16 text-center flex-shrink-0 rounded-lg`}
									onClick={() => {
										const date = el.toDateString().substring(4, 15);
										setVisitData((prevState) => ({ ...prevState, date }));
										getVisits(date);
									}}
								>
									<p>{formatDay(el).split('.')[0]}</p>
									<p>{formatDate(el)}</p>
								</button>
							))}
						</div>
					</div>
					{view === 'admin' ? (
						<>
							<div>
								{visits && visits.length !== 0 ? (
									visits.map((el, index) => (
										<div key={index} className={globalStyles.visitItem}>
											<p className={globalStyles.visitItemTitle}>{el.service}</p>
											<p>{el.hour}</p>
											<p className='mt-2 flex items-center'>
												<LuUser className='mr-2 text-lg' />
												{el.userFullName}
											</p>
										</div>
									))
								) : (
									<p className='text-center mt-4'>Brak wizyt w tym terminie.</p>
								)}
							</div>
						</>
					) : (
						<>
							<div className='w-full flex flex-wrap justify-center mx-auto py-4'>
								{accessibleVisits &&
									accessibleVisits.map((el, index) => (
										<button
											onClick={(e: MouseEvent<HTMLButtonElement>) => choiceHour(e.currentTarget.textContent || '')}
											type='button'
											key={index}
											className={`${globalStyles.buttonSecondary} mb-2 mr-2 p-2`}
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
								</div>
								<div className='mb-4'>
									<h3 className={globalStyles.h3}>Wybierz usługę:</h3>
									{servicesItems?.map((el, index) => (
										<div
											key={index}
											data-name={el.name}
											data-time={el.time}
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
													data-time={el.time}
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
