import { FC, ChangeEvent, KeyboardEvent } from 'react';

import styles from './styles';

interface IFormInput {
	label: string;
	id: string;
	type?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: FC<IFormInput> = ({ label, id, type, onChange }) => {
	return (
		<div className='mb-4'>
			<label htmlFor={id} className={styles.inputLabel}>
				{label}
			</label>
			<input type={type || 'text'} id={id} className={styles.input} onChange={onChange} />
		</div>
	);
};
export default FormInput;
