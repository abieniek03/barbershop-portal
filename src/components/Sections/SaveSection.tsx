'use client';
import { FC } from 'react';

import SectionLayout from '../Layouts/SectionLayout';
import SectionTitle from './Elements/SectionTitle';
import WeekSlider from '../WeekSlider/WeekSlider';

const SaveSection: FC = () => {
	return (
		<SectionLayout>
			<SectionTitle title='Zarezerwuj termin' id='zapisy' />
			<div>
				<WeekSlider />
			</div>
		</SectionLayout>
	);
};

export default SaveSection;
