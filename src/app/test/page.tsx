'use client';
import { FC } from 'react';
import { useSelector } from 'react-redux';

// import Layout from '@/components/Layouts/Layout';
// import LoadingAnimation from '@/components/Animations/LoadingAnimation';
import Navbar from '@/components/Navbar/Navbar';

const Test: FC = () => {
	const user = useSelector((state: any) => state.user);

	// return <Layout>{user.id == '' ? <LoadingAnimation label='Wczytywanie' /> : <Navbar />}</Layout>;
	return <Navbar />;
};

export default Test;
