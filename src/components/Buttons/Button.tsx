import { FC } from 'react';

import styles from './styles';

interface IButton {
	label: string;
	onClick: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Button: FC<IButton> = ({ label, onClick }) => {
	return (
		<button onClick={(e) => onClick} className={styles.button}>
			{label}
		</button>
	);
};

export default Button;
