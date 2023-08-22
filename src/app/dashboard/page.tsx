'use client';
import { FC, useCallback, useEffect } from 'react';
import { redirect } from 'next/navigation';

import Navbar from '@/components/Navbar/Navbar';
import Layout from '@/components/Layouts/Layout';
import WeekSlider from '@/components/WeekSlider/WeekSlider';

import { useStoreSelector } from '@/store/store';
import { IUserData } from '@/store/features/userSlice';

const DashboardPage: FC = () => {
	const user = useStoreSelector((store: IUserData) => store.user);

	const navigateUnauthorizedUser = useCallback(() => {
		if (user.rank !== 'admin') {
			redirect('/');
		}
	}, [user]);

	useEffect(() => {
		navigateUnauthorizedUser();
	}, [navigateUnauthorizedUser]);

	return (
		<>
			<Navbar />
			<Layout>
				<WeekSlider view='admin' />
			</Layout>
		</>
	);
};

export default DashboardPage;
