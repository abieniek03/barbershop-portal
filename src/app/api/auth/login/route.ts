import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import generateAuthToken from '@/utils/backend/generateAuthToken';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	const { email, password } = await req.json();

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) return NextResponse.json({ communicate: 'Nie ma takiego użytkownika.' }, { status: 404 });

	if (bcrypt.compareSync(password, user.hashedPassword)) {
		const authToken = generateAuthToken({ email, password });

		return NextResponse.json({ user, authToken });
	} else {
		return NextResponse.json({ communicate: 'Błędne hasło.' }, { status: 401 });
	}
};
