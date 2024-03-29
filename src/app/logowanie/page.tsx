'use client';

import { FC, useState, ChangeEvent, FormEvent } from 'react';


import AuthRedirector from '@/hoc/AuthRedirector';

import SwitchThemeButton from '@/components/Theme/SwitchThemeButton';
import FormHeading from '@/components/Form/FormHeading';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/Buttons/Button';
import LoadingButton from '@/components/Buttons/LoadingButton';
import LinkButton from '@/components/Buttons/LinkButton';
import ErrorAlert from '@/components/Alerts/ErrorAlert';

import axios from '../../axiosInstance';
import navigateAuthUser from '@/utils/auth/navigateAuthUser';

import globalStyles from '@/styles/global';

interface IUserData {
	email: string;
	password: string;
}

const LoginPage: FC = () => {
	const [loadingProcess, setLoadingProcess] = useState<boolean>(false);
	const [errorCommunicate, setErrorCommunicate] = useState<string>('');

	const [userData, setUserData] = useState<IUserData>({
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

	const handleLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (userData.email === '' || userData.password === '') {
			setErrorCommunicate('Uzupełnij wszystkie dane');
		} else {
			setLoadingProcess(true);
			axios
				.post('/auth/login', userData)
				.then((res) => {
					setLoadingProcess(false);
					sessionStorage.setItem('auth-token', res.data.authToken);
					sessionStorage.setItem('user-id', res.data.user.id);
					window.location.href = navigateAuthUser(res.data.user.rank);
				})
				.catch((error) => {
					setLoadingProcess(false);
					setErrorCommunicate(error.response.data.communicate);
				});
		}
	};

	return (
		<AuthRedirector>
			<div className={globalStyles.container}>
				<SwitchThemeButton customStyles='absolute top-7 right-7' />

				<form className='w-full max-w-[360px]' onSubmit={handleLogin}>
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
						/>
					))}

					{errorCommunicate !== '' && <ErrorAlert title={errorCommunicate} />}
					{!loadingProcess ? <Button onClick={handleLogin} label='Zaloguj się' /> : <LoadingButton label='Logowanie' />}
				</form>
				<LinkButton path='/odzyskiwanie' label='Nie pamiętam hasła' />
				<span className='w-full max-w-[360px] border my-2 dark:border-gray-600'></span>
				<LinkButton path='/rejestracja' label='Nie masz jeszcze konta? Zarejestruj się.' />
			</div>
		</AuthRedirector>
	);
};

export default LoginPage;
