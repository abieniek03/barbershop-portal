import { transporter } from '../config';

import mailTemplate from './template';

const sendResetPasswordEmail = (userEmail: string, userID: string) => {
	console.log('Wysłano email na adres: ' + userEmail);

	const mailOptions = {
		from: 'abwebproject.kontakt@gmail.com',
		to: userEmail,
		subject: 'Odzyskiwanie konta.',
		text: 'Weryfikacja użytkownika przebiegła pomyślnie. Możesz ustawić nowe hasło.',
		html: mailTemplate(userID),
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('LIPA! ' + error);
		} else {
			console.log('Wiadomość wysłana: ' + info.response);
		}
	});
};

export default sendResetPasswordEmail;
