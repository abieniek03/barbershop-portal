import mongoose, { Document, Schema } from 'mongoose';
import bcrypt, { hash } from 'bcrypt';

export interface IUser {
	email: string;
	username: string;
	password: string;
}

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			trim: true,
		},
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ versionKey: false }
);

userSchema.path('password').set((password: string) => {
	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(password, salt);
	return hashPassword;
});

export default mongoose.model<IUserModel>('User', userSchema);
