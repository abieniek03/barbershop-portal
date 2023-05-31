import mongoose from 'mongoose';

const dbConnection = () => {
	mongoose.set('strictQuery', true);
	mongoose
		.connect(process.env.DATABASE || 'mongodb+srv://admin:002NvFy004o50qls@cluster0.38cgxvs.mongodb.net/cv-generator')
		.then(() => console.log('Connected to DATABASE'))
		.catch((error) => {
			console.log('Failed connection to DATABASE');
			console.log(error);
		});
};

export default dbConnection;
