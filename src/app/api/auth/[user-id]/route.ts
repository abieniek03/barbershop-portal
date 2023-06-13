import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
	const userID = req.url.split('/')[5];

	const user = await prisma.user.findUnique({
		where: {
			id: userID,
		},
	});

	if (user) {
		return NextResponse.json({ user });
	} else {
		return NextResponse.json({ commuicate: 'Nie znaleziono takiego użytkownika' }, { status: 404 });
	}
};
