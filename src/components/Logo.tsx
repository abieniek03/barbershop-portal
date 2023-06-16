import { FC } from 'react';
import Link from 'next/link';
import { RiScissors2Fill } from 'react-icons/ri';

const logoStyles: string = 'text-primary uppercase font-bold text-lg tracking-wide flex justify-center';

const Logo: FC<{ path: string }> = ({ path }) => {
	if (path === '#') {
		return (
			<a href={path} className={logoStyles}>
				<RiScissors2Fill className='text-2xl mr-2' />
				Barbershop
			</a>
		);
	} else {
		return (
			<Link href={path} className={logoStyles}>
				<RiScissors2Fill className='text-2xl mr-2' />
				Barbershop
			</Link>
		);
	}
};

export default Logo;
