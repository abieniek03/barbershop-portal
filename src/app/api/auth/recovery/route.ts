import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import sendResetPasswordEmail from '@/utils/sendMail/resetPassword/sendMail';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	const { email } = await req.json();
	console.log(email);

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (user) {
		sendResetPasswordEmail(user.email, user.id);
		return NextResponse.json({ user });
	} else {
		return NextResponse.json({ communicate: 'Nie znaleziono takiego użytkownika' }, { status: 404 });
	}
};
