import { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<main className='min-h-screen p-8 md:px-16 lg:py-16'>
			<div className='max-w-[768px] mx-auto'>{children}</div>
		</main>
	);
};

export default Layout;
