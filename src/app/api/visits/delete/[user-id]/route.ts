import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DELETE = async (req: NextRequest) => {
	const id = req.url.split('/')[6];

	const canelVisit = await prisma.visit.delete({
		where: {
			id,
		},
	});

	return NextResponse.json({ communicate: 'Wizyta została odwołana' });
};
