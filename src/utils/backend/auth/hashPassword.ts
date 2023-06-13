import bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
	const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	return hashedPassword;
};

export default hashPassword;
