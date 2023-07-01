import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async () => {
	const allVisits = await prisma.visit.findMany({});

	return NextResponse.json({ allVisits });
};
