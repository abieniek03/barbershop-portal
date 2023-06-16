import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcrypt';

import hashPassword from '@/utils/auth/hashPassword';
import generateAuthToken from '@/utils/auth/generateAuthToken';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	const { email, firstName, lastName, password, rank } = await req.json();

	const validation = await prisma.user.findMany({
		where: {
			email,
		},
	});

	if (validation.length === 0) {
		const hashedPassword = hashPassword(password);

		const newUser = await prisma.user.create({
			data: {
				email,
				firstName,
				lastName,
				hashedPassword,
				rank,
			},
		});

		const authToken = generateAuthToken({ email, password });

		return NextResponse.json({ newUser, authToken }, { status: 201 });
	} else {
		console.log('lipa');
	}
};
