import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
	const userID = req.url.split('/')[6];

	const allVisits = await prisma.visit.findMany({
		where: {
			userID,
		},
	});

	return NextResponse.json(allVisits);
};
