'use client';
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Navbar from '@/components/Navbar/Navbar';
import Layout from '@/components/Layouts/Layout';
import LoadingAnimation from '@/components/Animations/LoadingAnimation';
import Modal from '@/components/Modals/Modal';
import { useStoreSelector } from '@/store/store';

import axios from '@/axiosInstance';
import { IVisitData } from '@/components/WeekSlider/WeekSlider';
import { formatFullDate } from '@/utils/formatDate';

import globalStyles from '@/styles/global';

const VisitsHistoryPage: FC = () => {
	const router = useRouter();

	const [visitsHistory, setVisitsHistory] = useState<IVisitData[]>();
	const [visitID, setVisitID] = useState<string>('');
	const [visibleConfirmModal, setVisibleConfirmModal] = useState<boolean>(false);

	const user = useStoreSelector((store) => store.user);

	const getVisitsHistory = () => {
		const userID = sessionStorage.getItem('user-id');
		axios
			.get(`/visits/${userID}`)
			.then((res) => {
				setVisitsHistory(res.data);
			})
			.catch((error) => console.error(error));
	};

	const canelVisit = (visitID: string) => {
		axios
			.delete(`/visits/delete/${visitID}`)
			.then(() => {
				setVisibleConfirmModal(false);
				window.location.reload();
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		if (!sessionStorage.getItem('user-id') || user.rank === 'admin') {
			router.push('/');
		}

		getVisitsHistory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Navbar />
			<Layout>
				<div>
					<h1 className='text-primary text-3xl font-bold py-4 border-b border-neutral-200 dark:border-neutral-600'>
						Historia wizyt
					</h1>
					<div className='mt-4'>
						{!visitsHistory ? (
							<LoadingAnimation label='Wczytywanie' />
						) : (
							<>
								{visitsHistory.length !== 0 ? (
									visitsHistory.map((el, index) => (
										<div key={index} className={`${globalStyles.visitItem} sm:flex sm:justify-between`}>
											<div>
												<p className={globalStyles.visitItemTitle}>{el.service}</p>
												<p>
													{formatFullDate(new Date(el.date))}, {el.hour}
												</p>
											</div>
											<div className='mt-2 sm:mt-0 sm:maw-w-20'>
												{new Date(`${el.date} ${el.hour}`) > new Date() ? (
													<button
														className={globalStyles.buttonPrimary}
														onClick={() => {
															setVisibleConfirmModal(true);
															setVisitID(el.id || '');
														}}
													>
														Odwołaj
													</button>
												) : (
													<p>Zrealizowano</p>
												)}
											</div>
										</div>
									))
								) : (
									<p className='text-center'>Brak wizyt</p>
								)}
							</>
						)}
					</div>
				</div>

				<Modal visible={visibleConfirmModal} title='Czy na pewno chcesz odwołać wizytę?'>
					<div className='flex justify-center'>
						<div>
							<p className='text-center m-2'>Potwierdź swoją dezycję.</p>
							<button className={`${globalStyles.buttonPrimary} mx-1`} onClick={() => canelVisit(visitID)}>
								Potwierdzam
							</button>
							<button className={`${globalStyles.buttonSecondary} mx-1`} onClick={() => setVisibleConfirmModal(false)}>
								Anuluj
							</button>
						</div>
					</div>
				</Modal>
			</Layout>
		</>
	);
};

export default VisitsHistoryPage;
