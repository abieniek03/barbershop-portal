'use client';
import { FC, useState, useEffect } from 'react';
import Link from 'next/link';

import SwitchThemeButton from '../Theme/SwitchThemeButton';
import Logo from '../Logo';
import navigationItems from '@/data/navigationItems';
import { LuMenu, LuX } from 'react-icons/lu';

const Navbar: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [logoPath, setLogoPath] = useState<string>('');

	useEffect(() => {
		setLogoPath(window.location.href.split('/').length === 4 ? '#' : '/');

		const handleResize = () => {
			window.innerWidth > 1024 ? setIsOpen(true) : setIsOpen(false);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<nav className='sticky top-0 w-full  bg-neutral-100 dark:bg-gray-900'>
			<div className='relative w-full max-w-[1600px] mx-auto flex justify-between items-center p-4 lg:py-2'>
				<Logo path={logoPath} />

				<div className='flex justify-center items-center'>
					<SwitchThemeButton customStyles='lg:order-last mb-0 lg:mr-0 lg:ml-2' />
					<button
						onClick={() => setIsOpen((isOpen) => !isOpen)}
						className='p-2 py-[9px] font-medium text-2xl text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-primary dark:hover:bg-gray-700 lg:hidden'
					>
						{isOpen ? <LuX /> : <LuMenu />}
					</button>
					<div
						className={`${
							isOpen ? 'flex' : 'hidden'
						} absolute bg-neutral-100 w-full top-[76px] left-0 px-2 pb-2 flex-col  dark:bg-gray-900 lg:relative lg:top-0 lg:flex lg:flex-row lg:items-center lg:pb-0 lg:bg-transparent dark:lg:bg-transparent`}
					>
						{navigationItems.map((el, index) => (
							<a onClick={() => setIsOpen(false)} href={el.path} key={index} className='m-1 px-2 py-2 lg:mx-4 lg:px-4'>
								{el.label}
							</a>
						))}
						<div className='flex flex-col px-2 lg:flex-row lg:px-0'>
							<Link
								href='/logowanie'
								className='text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-content-hover dark:hover:bg-gray-700 my-1 px-4 py-2 lg:mx-2 lg:my-2 text-center'
							>
								Zaloguj się
							</Link>
							<Link
								href='/rejestracja'
								className='bg-primary text-white hover:bg-primary-hover rounded-lg focus:outline-none my-2 px-4 py-2 lg:mx-2 text-center'
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
