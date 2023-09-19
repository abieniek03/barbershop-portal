import { FC } from 'react';

import Logo from '../Logo';
import navigationItems from '@/data/navigationItems';

const itemStyles: string = 'mx-4 text-center hover:underline md:mx-6';

const Footer: FC = () => {
	const handleCurrentYear = () => {
		const date = new Date();
		const year = date.getFullYear();
		return year;
	};
	return (
		<footer className='p-4 bg-neutral-100 md:p-8 lg:p-10 dark:bg-gray-900'>
			<div className='mx-auto max-w-screen-xl text-center'>
				<Logo path='#' />

				<ul className='flex flex-wrap justify-center items-center my-6 text-gray-900 dark:text-white'>
					{navigationItems.map((el, index) => (
						<li key={index}>
							<a href={el.path} className={itemStyles}>
								{el.label}
							</a>
						</li>
					))}
				</ul>
				<p className='mb-2 text-sm text-gray-500 sm:text-center dark:text-gray-400'>
					Wykonane przez{' '}
					<a href='https://www.abieniek.dev' target='_blank' className='font-bold hover:text-primary'>
						abieniek.dev
					</a>
				</p>
				<p className='mb-2 text-sm text-gray-500 sm:text-center dark:text-gray-400'>
					© {handleCurrentYear()} Wszelkie prawa zastrzeżone.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
