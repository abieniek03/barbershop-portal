import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	const { date, hour } = await req.json();

	const allVisits = await prisma.visit.findMany({
		where: {
			AND: [{ date }, { OR: [{ hour }, { hour: undefined }] }],
		},
	});

	return NextResponse.json(allVisits);
};
