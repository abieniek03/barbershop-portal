import { FC } from 'react';

import SectionLayout from '../Layouts/SectionLayout';
import SectionTitle from './Elements/SectionTitle';

const LocationSection: FC = () => {
	return (
		<SectionLayout>
			<SectionTitle title='Lokalizacja' />
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4841.365939341111!2d16.79930260199387!3d52.64764050311124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47046cca2f6ce339%3A0xbf94140b96a807e8!2sBiedronka!5e0!3m2!1spl!2spl!4v1686920288182!5m2!1spl!2spl'
				className='w-full h-80'
				loading='lazy'
			></iframe>
		</SectionLayout>
	);
};

export default LocationSection;
