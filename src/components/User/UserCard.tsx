import { FC } from 'react';

import Button from '../Buttons/Button';
import SwitchThemeButton from '../Theme/SwitchThemeButton';

interface IUserCard {
	userData: {
		email: string;
		firstName: string;
		lastName: string;
		password: string;
		passwordRepeat: string;
		rank: string;
	};
}

const UserCard: FC<IUserCard> = ({ userData }) => {
	const logout = () => {
		sessionStorage.clear();
		window.location.reload();
	};

	return (
		<div className='flex flex-col border-b-2 border-color pb-2 md:flex-row md:justify-between md:items-center'>
			<div className='flex items-center mb-2 p-2 rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-gray-700'>
				<div className='mr-3'>
					<div className='relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
						<span className='font-medium text-lg text-primary'>
							{userData.firstName[0]}
							{userData.lastName[0]}
						</span>
					</div>
				</div>
				<div className='font-medium dark:text-white'>
					<p>
						{userData.firstName} {userData.lastName}
					</p>
					<p className='text-sm text-gray-500 dark:text-gray-400'>{userData.email}</p>
				</div>
			</div>
			<div className='max-w-[440px] flex justify-center items-center p-2'>
				<SwitchThemeButton customStyles='p-3.5 mt-2 mx-1 mr-3.5' />
				<Button onClick={logout} label='Wyloguj się' />
			</div>
		</div>
	);
};

export default UserCard;
