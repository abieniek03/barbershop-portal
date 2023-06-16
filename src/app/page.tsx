import { FC } from 'react';

import Navbar from '@/components/Navbar/Navbar';
import HeroSection from '@/components/Sections/HeroSection';
import SalonsSection from '@/components/Sections/SalonsSection';
import Layout from '@/components/Layouts/Layout';
import OfferSection from '@/components/Sections/OfferSection';
import TeamSection from '@/components/Sections/TeamSection';
import SaveSection from '@/components/Sections/SaveSection';
import Footer from '@/components/Footer/Footer';

const Home: FC = () => {
	return (
		<>
			<Navbar />
			<HeroSection />
			<Layout>
				<SalonsSection />
				<OfferSection />
				<TeamSection />
				<SaveSection />
			</Layout>
			<Footer />
		</>
	);
};
export default Home;
