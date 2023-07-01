import { FC } from 'react';
import Link from 'next/link';

interface IUserProfileIcon {
	open: boolean;
	firstName: string;
	lastName: string;
	admin: boolean;
}

const UserProfileIcon: FC<IUserProfileIcon> = ({ open, firstName, lastName, admin }) => {
	const itemStyles = 'px-4 py-2 text-left hover:bg-gray-300 dark:hover:bg-gray-800';

	const logout = () => {
		sessionStorage.clear();
		window.location.reload();
	};

	return (
		<div>
			<button className='relative inline-flex items-center justify-center w-10 h-10 mx-2 overflow-hidden bg-primary  rounded-full lg:ml-6'>
				<span className='font-medium text-white'>
					{firstName.slice(0, 1)}
					{lastName.slice(0, 1)}
				</span>
			</button>
			{open && (
				<div className='absolute z-10 h-screen w-screen p-4 bg-neutral-100 dark:bg-gray-900 top-[76px] right-0 lg:h-auto lg:w-auto lg:top-[70px] lg:p-0'>
					<div className='flex flex-col'>
						<p className='bg-primary text-white text-lg font-bold px-4 py-2 pr-10'>
							{firstName} {lastName}
						</p>
						{admin ? (
							<Link href='/dashboard' className={itemStyles}>
								Dashboard
							</Link>
						) : (
							<Link href='/wizyty' className={itemStyles}>
								Wizyty
							</Link>
						)}
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
