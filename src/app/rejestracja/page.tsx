'use client';

import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

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
import { IUserData } from '@/store/features/userSlice';

const RegisterPage: FC = () => {
	const router = useRouter();
	const [loadingProcess, setLoadingProcess] = useState<boolean>(false);
	const [errorCommunicate, setErrorCommunicate] = useState<string>('');

	const [userData, setUserData] = useState<IUserData>({
		user: {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			passwordRepeat: '',
			rank: 'client',
		},
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

	const handleRegister = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoadingProcess(true);

		axios
			.post('/auth/register', userData.user)
			.then((res) => {
				setLoadingProcess(false);
				console.log(res);
				sessionStorage.setItem('auth-token', res.data.authToken);
				sessionStorage.setItem('user-id', res.data.newUser.id);
				router.push(navigateAuthUser(res.data.newUser.rank));
			})
			.catch((error) => {
				console.log(error);
				setLoadingProcess(false);
				setErrorCommunicate(error.response.data.communicate);
			});
	};

	return (
		<div className={globalStyles.container}>
			<SwitchThemeButton customStyles='absolute top-7 right-7' />
			<form className='w-full max-w-[360px]' onSubmit={handleRegister}>
				<FormHeading title='Rejestracja' />
				{formFields.map((el, index) => (
					<FormInput
						key={index}
						label={el.label}
						id={el.id}
						type={el.type}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setUserData((prevState) => ({ ...prevState, user: { ...prevState.user, [e.target.id]: e.target.value } }))
						}
					/>
				))}{' '}
				{errorCommunicate !== '' && <ErrorAlert title='Rejestracja się nie udała!' communicate={errorCommunicate} />}
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
