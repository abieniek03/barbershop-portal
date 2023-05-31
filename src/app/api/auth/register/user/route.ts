import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';

import dbConnection from '@/app/db/dbConnection';
import userModel from '@/app/db/models/user-model';

export const POST = async (req: NextRequest) => {
	dbConnection();

	const { email, username, password } = await req.json();
	const validation = await userModel.find({ email });

	if (validation.length === 0) {
		const newUser = new userModel({
			id: new Types.ObjectId(),
			email,
			username,
			password,
		});
		newUser.save();

		return NextResponse.json({ communicate: 'Rejestracja udana.' });
	} else {
		return NextResponse.json({ communicate: 'Zarejestrowano już konto na podany adres email' });
	}
};
