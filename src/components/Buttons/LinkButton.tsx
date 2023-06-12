import { FC } from 'react';
import Link from 'next/link';

import styles from './styles';

interface ILinkButton {
	path: string;
	label: string;
}

const LinkButton: FC<ILinkButton> = ({ path, label }) => {
	return (
		<Link href={path} className={styles.linkButton}>
			{label}
		</Link>
	);
};

export default LinkButton;
