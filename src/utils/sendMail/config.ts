import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'imap.gmail.com',
	port: 993,
	secure: false,
	auth: {
		user: 'abwebproject.kontakt@gmail.com',
		pass: 'wzbjhuuxwopglfqf',
	},
});
