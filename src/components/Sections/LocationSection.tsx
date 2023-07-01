import { FC } from 'react';

import SectionLayout from '../Layouts/SectionLayout';
import SectionTitle from './Elements/SectionTitle';

const LocationSection: FC = () => {
	return (
		<SectionLayout>
			<SectionTitle title='Lokalizacja' />
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.728566909097!2d21.000128276988058!3d52.230149057648354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c3c80e54d%3A0x12702cc984d8e75c!2sZ%C5%82ote%20Tarasy!5e0!3m2!1spl!2spl!4v1687997729815!5m2!1spl!2spl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
				className='w-full h-80'
				loading='lazy'
			></iframe>
		</SectionLayout>
	);
};

export default LocationSection;
