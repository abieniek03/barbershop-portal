'use client';
import { FC, ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

const ThemeConfig: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<ThemeProvider enableSystem={true} attribute='class'>
			{children}
		</ThemeProvider>
	);
};

export default ThemeConfig;
