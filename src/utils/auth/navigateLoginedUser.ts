'use client';
import { useRouter } from 'next/navigation';

const navigateLoginedUser = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();

	if (sessionStorage.getItem('auth-token')) {
		router.push('/');
	}
	return null;
};

export default navigateLoginedUser;
