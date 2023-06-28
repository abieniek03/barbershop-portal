'use client';
import { FC } from 'react';

import { formatFullDate } from '@/utils/formatDate';

import Navbar from '@/components/Navbar/Navbar';
import Layout from '@/components/Layouts/Layout';
import SectionTitle from '@/components/Sections/Elements/SectionTitle';

import axios from '@/axiosInstance';
import globalStyles from '@/styles/global';

const SaveVisitPage: FC = () => {
	const visitData = JSON.parse(sessionStorage.getItem('visit-data') || '');

	const saveVisit = () => {
		const userID = sessionStorage.getItem('user-id');

		axios
			.post('/visits/save', { ...visitData, userID })
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Navbar />
			<Layout>
				<div className='py-32'>
					<SectionTitle title='Podsumowanie' />

					<div className='flex justify-center items-center'>
						<div>
							<p className='text-lg font-bold'>{visitData.service}</p>
							<p>
								Termin: {formatFullDate(new Date(visitData.date))}, {visitData.hour}
							</p>
							<p className='mt-2 uppercase'>Płatność kartą lub gotówką w salonie.</p>
							<div className='flex justify-center items-center my-2'>
								<button onClick={saveVisit} className={globalStyles.buttonPrimary}>
									Potwierdź
								</button>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default SaveVisitPage;
