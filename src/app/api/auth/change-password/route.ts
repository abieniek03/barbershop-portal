import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import hashPassword from '@/utils/backend/auth/hashPassword';

const prisma = new PrismaClient();

export const PUT = async (req: NextRequest) => {
	const { userID, newPassword } = await req.json();

	const hashedPassword = hashPassword(newPassword);

	await prisma.user.update({
		where: {
			id: userID,
		},
		data: {
			hashedPassword,
		},
	});

	return NextResponse.json({ communicate: 'Hasło zostało zmienione.' });
};
