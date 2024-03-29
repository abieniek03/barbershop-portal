'use client';
import { FC, useEffect } from 'react';

import Navbar from '@/components/Navbar/Navbar';
import HeroSection from '@/components/Sections/HeroSection';
import LocationSection from '@/components/Sections/LocationSection';
import Layout from '@/components/Layouts/Layout';
import AboutSection from '@/components/Sections/AboutSection';
import OfferSection from '@/components/Sections/OfferSection';
import SaveSection from '@/components/Sections/SaveSection';
import Footer from '@/components/Footer/Footer';

const Home: FC = () => {
	useEffect(() => {
		if (sessionStorage.getItem('visit-data')) {
			sessionStorage.removeItem('visit-data');
		}
	}, []);

	return (
		<>
			<Navbar />
			<HeroSection />
			<Layout>
				<LocationSection />
				<AboutSection />
				<OfferSection />
				<SaveSection />
			</Layout>
			<Footer />
		</>
	);
};
export default Home;
