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

import axios from '@/axiosInstance';
import navigateAuthUser from '@/utils/auth/navigateAuthUser';

import globalStyles from '@/styles/global';
import { IUserData } from '@/store/features/userSlice';

const RegisterAdminPage: FC = () => {
	const router = useRouter();
	const [loadingProcess, setLoadingProcess] = useState<boolean>(false);
	const [errorCommunicate, setErrorCommunicate] = useState<string>('');

	const [userData, setUserData] = useState<IUserData>({
		user: {
			email: '',
			rank: 'admin',
		},
	});

	const formFields = [
		{
			label: 'Adrea mailowy',
			id: 'email',
			type: 'email',
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
			<form className='w-full max-w-[390px]' onSubmit={handleRegister}>
				<FormHeading title='Zarejestruj administratora' />
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

export default RegisterAdminPage;
