import { FC } from 'react';

interface IMenuButton {}

const MenuButton: FC<IMenuButton> = () => {
	return (
		<button className='p-2 bg-sky-900 relative'>
			<div className='h-7 w-7 bg-sky-500 relative flex justify-center items-center'>
				<span className='bg-black w-full h-1 absolute'></span>
			</div>
		</button>
	);
};

export default MenuButton;
