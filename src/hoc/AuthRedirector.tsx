'use client';
import { FC, ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const AuthRedirector: FC<{ children: ReactNode }> = ({ children }) => {
	const router = useRouter();
	if (sessionStorage.getItem('auth-token')) {
		router.push('/');
	}

	return <>{children}</>;
};

export default AuthRedirector;
