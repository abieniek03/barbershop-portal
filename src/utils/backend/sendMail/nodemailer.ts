import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'imap.gmail.com',
	port: 993,
	secure: false,
	auth: {
		user: 'abwebproject.kontakt@gmail.com',
		pass: 'wzbjhuuxwopglfqf',
	},
});

export const sendMail = (userEmail: string) => {
	console.log('Wysłano email na adres: ' + userEmail);

	const mailOptions = {
		from: 'abwebproject.kontakt@gmail.com',
		to: userEmail,
		subject: 'Potwierdź zapis na szkolenie online.',
		text: 'Siema!👋 To jest wiadomość testowa.',
		html: 'lwdoawd',
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('LIPA! ' + error);
		} else {
			console.log('Wiadomość wysłana: ' + info.response);
		}
	});
};
