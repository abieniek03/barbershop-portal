'use client';
import { FC, ReactNode } from 'react';
import { redirect } from 'next/navigation';

const AuthRedirector: FC<{ children: ReactNode }> = ({ children }) => {
	if (sessionStorage.getItem('auth-token')) {
		redirect('/');
	}

	return <>{children}</>;
};

export default AuthRedirector;
