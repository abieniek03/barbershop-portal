'use client';

import { FC, useState, ChangeEvent } from 'react';

import SwitchThemeButton from '@/components/Theme/SwitchThemeButton';
import FormHeading from '@/components/Form/FormHeading';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Buttons/Button';
import LoadingButton from '@/components/Buttons/LoadingButton';
import LinkButton from '@/components/Buttons/LinkButton';

import axios from '../../axiosInstance';
import ErrorAlert from '@/components/Alerts/ErrorAlert';

const LoginPage: FC = () => {
	const [loadingProcess, setLoadingProcess] = useState<boolean>(false);
	const [errorCommunicate, setErrorCommunicate] = useState<string>('');

	const [userData, setUserData] = useState<{ [key: string]: string }>({
		email: '',
		password: '',
	});

	const formFields = [
		{
			label: 'Adrea mailowy',
			id: 'email',
			type: 'email',
		},
		{
			label: 'Hasło',
			id: 'password',
			type: 'password',
		},
	];

	const handleLogin = () => {
		setLoadingProcess(true);

		axios
			.post('/auth/login', userData)
			.then((res) => {
				setLoadingProcess(false);
				localStorage.setItem('auth-token', res.data.authToken);
				console.log(res);
			})
			.catch((error) => {
				setLoadingProcess(false);
				setErrorCommunicate(error.response.data.communicate);
				console.error(error);
			});
	};

	return (
		<div className='h-screen max-w-[360px] flex flex-col justify-center items-center mx-auto'>
			<SwitchThemeButton customStyles='absolute top-7 right-7' />

			<form className='w-full'>
				<FormHeading title='Logowanie' />
				{formFields.map((el, index) => (
					<FormInput
						label={el.label}
						id={el.id}
						key={index}
						type={el.type}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setUserData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }))
						}
						onKeyDown={handleLogin}
					/>
				))}
				{errorCommunicate !== '' && <ErrorAlert title='Rejestracja się nie udała' communicate={errorCommunicate} />}
				{!loadingProcess ? <Button onClick={handleLogin} label='Zaloguj się' /> : <LoadingButton label='Logowanie' />}

				<LinkButton path='/rejestracja' label='Nie masz jeszcze konta? Zarejestruj się.' />
			</form>
		</div>
	);
};

export default LoginPage;
