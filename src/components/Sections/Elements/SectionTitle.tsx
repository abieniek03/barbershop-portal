import { FC } from 'react';

const SectionTitle: FC<{ title: string; id?: string }> = ({ title, id }) => {
	return (
		<h2 id={id} className='text-primary text-3xl text-center font-bold mb-4 scroll-mt-24 md:mb-6 lg:text-4xl'>
			{title}
		</h2>
	);
};

export default SectionTitle;
