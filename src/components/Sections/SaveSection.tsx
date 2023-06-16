import { FC } from 'react';

import SectionLayout from '../Layouts/SectionLayout';
import SectionTitle from './Elements/SectionTitle';

const SaveSection: FC = () => {
	return (
		<SectionLayout>
			<SectionTitle title='Zarezerwuj termin' id='zapisy' />
			<div></div>
		</SectionLayout>
	);
};

export default SaveSection;
