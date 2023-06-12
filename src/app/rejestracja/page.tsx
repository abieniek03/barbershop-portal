'use client';

import { FC, useState, ChangeEvent, useEffect } from 'react';

import SwitchThemeButton from '@/components/Theme/SwitchThemeButton';
import FormHeading from '@/components/Form/FormHeading';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Buttons/Button';
import LoadingButton from '@/components/Buttons/LoadingButton';
import LinkButton from '@/components/Buttons/LinkButton';

import axios from '../../axiosInstance';
import ErrorAlert from '@/components/Alerts/ErrorAlert';

const RegisterPage: FC = () => {
	const [loadingProcess, setLoadingProcess] = useState<boolean>(false);
	const [errorCommunicate, setErrorCommunicate] = useState<string>('');

	const [userData, setUserData] = useState<{ [key: string]: string }>({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		passwordRepeat: '',
		rank: 'client',
	});

	const formFields = [
		{
			label: 'Adrea mailowy',
			id: 'email',
			type: 'email',
		},
		{
			label: 'Imię',
			id: 'firstName',
		},
		{
			label: 'Nazwisko',
			id: 'lastName',
		},
		{
			label: 'Hasło',
			id: 'password',
			type: 'password',
		},
		{
			label: 'Powtórz hasło',
			id: 'passwordRepeat',
			type: 'password',
		},
	];

	const handleRegister = () => {
		setLoadingProcess(true);
		setErrorCommunicate('coś nie tak');
		axios
			.post('/auth/register', userData)
			.then((res) => {
				setLoadingProcess(false);
				localStorage.setItem('auth-token', res.data.authToken);
				console.log(res);
			})
			.catch((error) => {
				setLoadingProcess(false);
				setErrorCommunicate(error.data.communicate);
				console.error(error);
			});

		console.log(userData);
	};

	return (
		<div className='h-screen max-w-[360px] flex flex-col justify-center items-center mx-auto'>
			<SwitchThemeButton customStyles='absolute top-7 right-7' />
			<form className='w-full'>
				<FormHeading title='Rejestracja' />
				{formFields.map((el, index) => (
					<FormInput
						key={index}
						label={el.label}
						id={el.id}
						type={el.type}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setUserData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }))
						}
						onKeyDown={handleRegister}
					/>
				))}{' '}
				{errorCommunicate !== '' && <ErrorAlert title='Rejestracja się nie udała' communicate={errorCommunicate} />}
				{!loadingProcess ? (
					<Button onClick={handleRegister} label='Zarejestruj się' />
				) : (
					<LoadingButton label='Rejestracja' />
				)}
				<LinkButton path='/logowanie' label='Masz już konto? Zaloguj się.' />
			</form>
		</div>
	);
};

export default RegisterPage;
