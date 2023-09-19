import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

import Config from '@/components/Config/Config';
import ThemeConfig from '@/components/Config/NextThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Barbershop',
	description: 'Zadbaj o swój wygląd! Najlepszy salon barberski w mieście. Umiarkowane ceny i wysoka jakość usług.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Config>
			<html lang='pl' className='scroll-smooth'>
				<body className={inter.className + ' dark:bg-gray-800'}>
					<ThemeConfig>{children}</ThemeConfig>
				</body>
			</html>
		</Config>
	);
}
