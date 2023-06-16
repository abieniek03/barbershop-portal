import { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<main className='px-8 md:px-16'>
			<div className='max-w-screen-lg mx-auto'>{children}</div>
		</main>
	);
};

export default Layout;
