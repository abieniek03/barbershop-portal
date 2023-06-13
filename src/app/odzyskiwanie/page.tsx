'use client';

import { FC, useState, ChangeEvent, FormEvent } from 'react';

import SwitchThemeButton from '@/components/Theme/SwitchThemeButton';
import FormHeading from '@/components/Form/FormHeading';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Buttons/Button';
import LoadingButton from '@/components/Buttons/LoadingButton';

import axios from '../../axiosInstance';
import ErrorAlert from '@/components/Alerts/ErrorAlert';

import globalStyles from '@/styles/global';

const RecoveryPage: FC = () => {
	const [verification, setVerification] = useState<boolean>(false);
	const [loadingProcess, setLoadingProcess] = useState<boolean>(false);
	const [errorCommunicate, setErrorCommunicate] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	const handleRecovery = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoadingProcess(true);

		axios
			.post('/auth/recovery', { email })
			.then((res) => {
				console.log(res);
				setVerification(true);
			})
			.catch((error) => {
				// console.error(error.response.data.communicate);
				setLoadingProcess(false);
				setErrorCommunicate(error.response.data.communicate);
			});
	};

	return (
		<div className={globalStyles.container}>
			<SwitchThemeButton customStyles='absolute top-7 right-7' />
			{!verification ? (
				<form className='w-full max-w-[360px]' onSubmit={handleRecovery}>
					<FormHeading title='Odzyskiwanie konta' />{' '}
					{errorCommunicate !== '' && <ErrorAlert title={errorCommunicate} />}
					<FormInput
						label='Adres mailowy'
						id='email'
						key='email'
						type='email'
						onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					/>
					{!loadingProcess ? (
						<Button onClick={handleRecovery} label='Odzyskaj konto' />
					) : (
						<LoadingButton label='Weryfikowanie...' />
					)}
				</form>
			) : (
				<div className='max-w-[840px]'>
					<h1 className={globalStyles.h1}>Weryfkiacja się powiodła!</h1>
					<p>
						Wiadomość z linkiem do zmiany hasłą została wysłana na adres mailowy. Sprawdź swoją skrzynkę. Jeśli nie
						znajdziesz jej w ostatnich wiadomościach, sprawdź folder <span className='font-bold'>spam.</span>
					</p>
				</div>
			)}
		</div>
	);
};

export default RecoveryPage;
