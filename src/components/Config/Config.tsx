'use client';
import { FC, ReactNode, useState, useEffect } from 'react';

import { Provider } from 'react-redux';
import { fetchUserData } from '@/store/features/userSlice';

import store from '@/store/store';

const Config: FC<{ children: ReactNode }> = ({ children }) => {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
		if (mounted) {
			const userID = sessionStorage.getItem('user-id') || '';
			store.dispatch(fetchUserData(userID));
		}
	}, [mounted]);

	return <Provider store={store}>{children}</Provider>;
};

export default Config;
