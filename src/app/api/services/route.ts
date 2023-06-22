import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async () => {
	const allServices = await prisma.service.findMany({});
	if (allServices.length === 0) NextResponse.json({ communicate: 'Nieznaleziono żadnych usług.' }, { status: 404 });

	return NextResponse.json(allServices);
};

export const POST = async (req: NextRequest) => {
	const { name, price, time, info } = await req.json();

	const validation = await prisma.service.findMany({
		where: {
			name,
		},
	});

	if (validation.length === 0) {
		const newService = await prisma.service.create({
			data: {
				name,
				price,
				time,
				info,
			},
		});

		return NextResponse.json(newService, { status: 201 });
	} else {
		return NextResponse.json({ communicate: 'Istnieje już taka usługa' }, { status: 406 });
	}
};
