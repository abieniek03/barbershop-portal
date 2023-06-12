import jsonwebtoken from 'jsonwebtoken';

const ACCESS_TOKEN = 'de$Egd%we3e%eGut^rdcFer3tr&adsP$3mrp';

interface IUser {
	email: string;
	password: string;
}

const generateAuthToken = (user: IUser) => {
	const token = jsonwebtoken.sign(user, ACCESS_TOKEN);
	return token;
};

export default generateAuthToken;
