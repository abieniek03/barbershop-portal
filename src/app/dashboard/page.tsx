'use client';
import { FC } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Layout from '@/components/Layouts/Layout';
import WeekSlider from '@/components/WeekSlider/WeekSlider';

const DashboardPage: FC = () => {
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
