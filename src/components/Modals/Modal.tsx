import { FC, ReactNode, useState } from 'react';
import Link from 'next/link';

import globalStyles from '@/styles/global';
import buttonStyles from '../Buttons/styles';

interface IModal {
	visible: boolean;
	title: string;
	children: ReactNode;
	addStyles?: string;
}

const Modal: FC<IModal> = ({ visible, title, children, addStyles }) => {
	return (
		<div
			className={`${
				visible ? 'animate-open-modal' : 'hidden'
			} bg-modal-bg fixed z-50 h-screen w-screen top-0 left-0 flex justify-center items-center`}
		>
			<div className={`bg-neutral-100 dark:bg-gray-800 mx-6 p-6 rounded-lg lg:p-8 ${addStyles}`}>
				<h2 className={`${globalStyles.h2} pb-2 text-center border-b border-neutral-200 dark:border-gray-700`}>
					{title}
				</h2>
				{children}
			</div>
		</div>
	);
};

export default Modal;
