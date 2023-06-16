'use client';
import { FC, useState, useEffect } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import { RiScissors2Fill } from 'react-icons/ri';
import Link from 'next/link';

import SwitchThemeButton from '../Theme/SwitchThemeButton';

const navItems: { label: string; path: string }[] = [
	{
		label: 'Oferta',
		path: '#oferta',
	},
	{
		label: 'Zapisy',
		path: '/zapisy',
	},
];

const Navbar: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			window.innerWidth > 768 ? setIsOpen(true) : setIsOpen(false);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<nav className='w-full bg-neutral-100 dark:bg-gray-900'>
			<div className='relative w-full max-w-screen-xl mx-auto flex justify-between items-center p-4 md:py-2'>
				<Link href='/' className='text-primary uppercase font-bold text-lg tracking-wide flex justify-center'>
					<RiScissors2Fill className='text-2xl mr-2' />
					Barbershop
				</Link>

				<div className='flex justify-center items-center'>
					<SwitchThemeButton customStyles='md:order-last mb-0 md:mr-0 md:ml-2' />
					<button
						onClick={() => setIsOpen((isOpen) => !isOpen)}
						className='p-2 py-[9px] font-medium text-2xl text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-primary dark:hover:bg-gray-700 md:hidden'
					>
						{isOpen ? <LuX /> : <LuMenu />}
					</button>

					<div
						className={`${
							isOpen ? 'flex' : 'hidden'
						} absolute bg-neutral-100 w-full top-[76px] left-0 pb-2  flex-col  dark:bg-gray-900 md:relative md:top-0 md:flex md:flex-row md:items-center md:pb-0`}
					>
						{navItems.map((el, index) => (
							<Link href={el.path} key={index} className='m-1 px-2 py-2 md:mx-4 md:px-4'>
								{el.label}
							</Link>
						))}
						<div className='flex flex-col px-2 md:flex-row md:px-0'>
							<Link
								href='/logowanie'
								className='text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-content-hover dark:hover:bg-gray-700 my-1 px-4 py-2 md:mx-2 md:my-2 text-center'
							>
								Zaloguj się
							</Link>
							<Link
								href='/rejestracja'
								className='bg-primary text-white hover:bg-primary-hover rounded-lg focus:outline-none my-2 px-4 py-2 md:mx-2 text-center'
							>
								Zarejestruj się
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
