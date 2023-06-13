'use client';

import { FC, useState, ChangeEvent, FormEvent, useCallback, useEffect } from 'react';

import SwitchThemeButton from '@/components/Theme/SwitchThemeButton';
import FormHeading from '@/components/Form/FormHeading';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Buttons/Button';
import LoadingButton from '@/components/Buttons/LoadingButton';
import ErrorAlert from '@/components/Alerts/ErrorAlert';
import LoadingAnimation from '@/components/Animations/LoadingAnimation';
import Modal from '@/components/Modals/Modal';

import axios from '../../../axiosInstance';
import globalStyles from '@/styles/global';

const RecoveryPage: FC = () => {
	const [mounted, setMounted] = useState<boolean>(false);

	const [userID, setUserID] = useState<string>('');
	const [verification, setVerification] = useState<boolean | string>('checking');
	const [loadingProcess, setLoadingProcess] = useState<boolean>(false);
	const [errorCommunicate, setErrorCommunicate] = useState<string>('');
	const [successfullProcess, setSuccessfullProcess] = useState<boolean>(false);

	const [userData, setUserData] = useState<{ [key: string]: string }>({
		newPassword: '',
		repeatNewPassword: '',
	});

	const formFields = [
		{
			label: 'Hasło',
			id: 'newPassword',
			type: 'password',
		},
		{
			label: 'Powtórz hasło',
			id: 'repeatNewPassword',
			type: 'password',
		},
	];

	const verifiedUser = useCallback(() => {
		setUserID(window.location.href.split('/')[4]);

		if (userID !== '')
			axios
				.get(`/auth/${userID}`)
				.then(() => setVerification('successfull'))
				.catch(() => setVerification(false));
	}, [userID]);

	const changePassword = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (userData.newPassword === '' || userData.repeatNewPassword === '') {
			setErrorCommunicate('Wypełnij wszystkie pola');
		} else if (userData.newPassword !== userData.repeatNewPassword) {
			console.log('hasła nie są takie same');
			setErrorCommunicate('Hasła nie są takie same');
		} else {
			setErrorCommunicate('');
			setLoadingProcess(true);
			axios
				.put('/auth/change-password', { userID, newPassword: userData.newPassword })
				.then(() => {
					setLoadingProcess(false);
					setSuccessfullProcess(true);
				})
				.catch(() => setLoadingProcess(false));
		}
	};

	useEffect(() => {
		setMounted(true);
		if (mounted) {
			verifiedUser();
		}
	}, [mounted, verifiedUser]);

	return (
		<div className={globalStyles.container}>
			<SwitchThemeButton customStyles='absolute top-7 right-7' />

			<Modal
				visible={successfullProcess}
				title='Twoje hasło zostało zmienione'
				message='Zaloguj się ponownie na swoje konto używając nowego hasła.'
			/>

			{verification === 'checking' && <LoadingAnimation label='Trwa weryfikacja...' />}
			{verification === 'successfull' && (
				<form onSubmit={changePassword} className='w-full max-w-[360px]'>
					<FormHeading title='Ustaw nowe hasło' />
					{formFields.map((el, index) => (
						<FormInput
							label={el.label}
							id={el.id}
							key={index}
							type={el.type}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setUserData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }))
							}
						/>
					))}
					{errorCommunicate !== '' && <ErrorAlert title={errorCommunicate} />}
					{!loadingProcess ? (
						<Button onClick={changePassword} label='Zmień hasło' />
					) : (
						<LoadingButton label='Przetwarzanie...' />
					)}
				</form>
			)}
			{!verification && (
				<div>
					<h1 className={globalStyles.h1}>Weryfikacja użytkownika się nie powodła!</h1>
					<p className='lg:text-center'>Najprawdopodobniej źle skopiowałeś link lub zmieniłeś adres strony.</p>
				</div>
			)}
		</div>
	);
};

export default RecoveryPage;
