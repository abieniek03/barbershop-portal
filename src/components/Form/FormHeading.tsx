import { FC } from 'react';

import styles from './styles';

interface IFormHeading {
	title: string;
}

const FormHeading: FC<IFormHeading> = ({ title }) => {
	return <h2 className={styles.heading}>{title}</h2>;
};

export default FormHeading;
