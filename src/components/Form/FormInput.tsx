import { FC, KeyboardEvent } from 'react';

import styles from './styles';

interface IFormInput {
	label: string;
	id: string;
	type?: string;
	onChange?: (e: any) => void;
	onKeyDown?: () => void;
}

const FormInput: FC<IFormInput> = ({ label, id, type, onChange, onKeyDown }) => {
	return (
		<div className='mb-4'>
			<label htmlFor={id} className={styles.inputLabel}>
				{label}
			</label>
			<input
				type={type || 'text'}
				id={id}
				className={styles.input}
				onChange={onChange}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => (e.key === 'Enter' ? onKeyDown() : null)}
				required
			/>
		</div>
	);
};
export default FormInput;
