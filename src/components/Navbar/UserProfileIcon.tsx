import { FC } from 'react';
import Link from 'next/link';

interface IUserProfileIcon {
	open: boolean;
	firstName: string;
	lastName: string;
}

const UserProfileIcon: FC<IUserProfileIcon> = ({ open, firstName, lastName }) => {
	console.log(open);

	const itemStyles = 'px-4 py-2 text-left hover:bg-gray-300 dark:hover:bg-gray-800';

	const logout = () => {
		sessionStorage.clear();
		window.location.reload();
	};

	return (
		<div>
			<button className='relative inline-flex items-center justify-center w-10 h-10 mx-2 overflow-hidden bg-gray-200 rounded-full dark:bg-primary lg:ml-6'>
				<span className='font-medium text-primary dark:text-white'>
					{firstName.slice(0, 1)}
					{lastName.slice(0, 1)}
				</span>
			</button>
			{open && (
				<div className='absolute h-screen w-screen p-4 bg-gray-200 dark:bg-gray-900 top-[76px] right-0 lg:h-auto lg:w-auto lg:top-[70px] lg:p-0'>
					<div className='flex flex-col'>
						<p className='bg-primary text-white text-lg font-bold px-4 py-2 pr-10'>
							{firstName} {lastName}
						</p>
						<Link href='/zmien-dane' className={itemStyles}>
							Zmień dane
						</Link>
						<button onClick={logout} className={itemStyles}>
							Wyloguj się
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfileIcon;
