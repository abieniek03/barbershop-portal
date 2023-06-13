import { FC } from 'react';
import Link from 'next/link';

import globalStyles from '@/styles/global';
import buttonStyles from '../Buttons/styles';

interface IModal {
	visible: boolean;
	title: string;
	message: string;
}

const Modal: FC<IModal> = ({ visible, title, message }) => {
	return (
		<div
			className={`${
				visible ? 'animate-open-modal' : 'hidden'
			} bg-modal-bg absolute h-screen w-screen flex justify-center items-center`}
		>
			<div className='dark:bg-gray-800 mx-6 p-6 rounded-lg lg:p-8'>
				<h2 className={`${globalStyles.h2} pb-2 text-center border-b border-neutral-200 dark:border-gray-700`}>
					{title}
				</h2>
				<p className='my-2'>{message}</p>
				<div className='flex justify-center items-center'>
					<Link
						href='/logowanie'
						className=' bg-primary hover:bg-primary-hover mt-2 px-5 py-2.5 text-white font-medium rounded-lg'
					>
						Przejdź
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Modal;
