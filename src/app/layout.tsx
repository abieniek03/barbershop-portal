'use client';

import { useEffect, useState } from 'react';
import { fetchUserData } from '@/store/features/userSlice';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';

import store from '../store/store';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
		if (mounted) {
			const userID = sessionStorage.getItem('user-id') || '';
			store.dispatch(fetchUserData(userID));
		}
	}, [mounted]);

	return (
		<Provider store={store}>
			<html lang='pl' className='scroll-smooth'>
				<body className={inter.className + ' dark:bg-gray-800'}>
					<ThemeProvider enableSystem={true} attribute='class'>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</Provider>
	);
}
