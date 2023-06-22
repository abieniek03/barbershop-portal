import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
	const allEmployees = await prisma.user.findMany({
		where: {
			rank: 'admin',
		},
	});

	return NextResponse.json(allEmployees);
};
