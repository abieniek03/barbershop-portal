import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	const { employee, userID, name, date, time } = await req.json();

	const newVisit = await prisma.visit.create({
		data: {
			employee,
			userID,
			name,
			date,
			time,
		},
	});

	return NextResponse.json({ newVisit }, { status: 201 });
};