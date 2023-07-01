import { FC, ReactNode } from 'react';

const SectionLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return <section className='my-14 md:my-28'>{children}</section>;
};

export default SectionLayout;
