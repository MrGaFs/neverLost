import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().report;

export enum Status{
	active='active',
	done='done'
}

type report = {
	user_id: number
	targeted_user_id: number
	Latitude: string
	Longitude: string
	member_id:number
	status: Status
};

const returnedData = {
	id: true,
	user_id: true,
	targeted_user_id: true,
	Latitude: true,
	Longitude: true,
	status: true, 
	member_id: true,
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
	public async updateStatus(id: number, data: { status: Status }) {
		return await prisma.update({
			where: { id: id },
			data: data,
			select: returnedData,
		});
	}

	public async getActiveReports(targeted_user_id: number) {
		return await prisma.findMany({
			where: { targeted_user_id: targeted_user_id, status: Status.active },
			select: returnedData,
		});
	}
}

export default Report;