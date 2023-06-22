import { FC } from 'react';
import Image from 'next/image';

import { useStoreDispatch, useStoreSelector } from '@/store/store';
import { fetchUserData } from '@/store/features/userSlice';
import { IUserData } from '@/store/features/userSlice';
import image from '@/images/team/Roman.jpg';

const AdminProfile: FC = () => {
	const user = useStoreSelector((store: IUserData) => store.user);
	return (
		<div className='my-4 py-4 flex flex-col justify-center items-center md:flex-row md:justify-start border-b'>
			<Image src={image} alt='adwdadwda' height={100} width={100} className='rounded-full md:w-36' />
			<div className='mt-2 md:mt-0 md:ml-5'>
				<p className='text-xl font-bold md:text-3xl'>
					{user.firstName} {user.lastName}
				</p>
				<button className='text-sm md:text-base'>Zmień zdjęcie</button>
			</div>
		</div>
	);
};

export default AdminProfile;
