'use client';
import { FC, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Navbar from '@/components/Navbar/Navbar';
import Layout from '@/components/Layouts/Layout';
import WeekSlider from '@/components/WeekSlider/WeekSlider';

import { useStoreSelector } from '@/store/store';
import { IUserData } from '@/store/features/userSlice';

const DashboardPage: FC = () => {
	const router = useRouter();
	const user = useStoreSelector((store: IUserData) => store.user);

	const navigateUnauthorizedUser = useCallback(() => {
		if (user && user.rank !== 'admin') {
			router.push('/');
		}
	}, [user, router]);

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
