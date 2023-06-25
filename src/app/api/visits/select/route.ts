import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	const { date, time } = await req.json();

	const trimDate = date.trim();

	const allVisits = await prisma.visit.findMany({
		where: {
			AND: [{ date: trimDate }, { OR: [{ time }, { time: undefined }] }],
		},
	});

	return NextResponse.json(allVisits);
};
