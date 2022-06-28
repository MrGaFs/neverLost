import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().report;

type report = {
	user_id: number
	targeted_user_id: number
	Latitude: string
	Longitude: string
};

const returnedData = {
	user_id: true,
	targeted_user_id: true,
	Latitude: true,
	Longitude: true,
};
const returnedUser = {
	phone: true,
	email: true,
	first_name: true,
	last_name: true,
};

class Report {
	public async getReport(id: number) {
		return await prisma.findUnique({
			where: { id: id },
			select: {
				...returnedData,
				user: {
					select: returnedUser,
				}
			}
		});
	}
	public async createReport(report: report) {
		return await prisma.create({
			data: report,
			select: returnedData,
		});
	}
}

export default Report;