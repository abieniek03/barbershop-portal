import { FC } from 'react';

import styles from './styles';

interface IButton {
	label: string;
	onClick: () => void;
}

const Button: FC<IButton> = ({ label, onClick }) => {
	return (
		<button onClick={onClick} className={styles.button}>
			{label}
		</button>
	);
};

export default Button;
