import { Inter } from 'next/font/google';
import '../globals.css';

import Config from '@/components/Config/Config';
import ThemeConfig from '@/components/Config/NextThemeProvider';

const inter = Inter({ subsets: ['latin'] });

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
