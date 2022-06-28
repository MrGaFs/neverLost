import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient().qrCode;
type qrCode = {
	member_id: number;
	path: string;
};
const selectedData = {
	id: true,
	member_id: true,
	path: true,
};

class QrCode {
	public async getQrCode(qrcode_id: number) {
		return await prisma.findUnique({
			where: {
				id: qrcode_id,
			},
			select: selectedData,
		});
	}
	public async createQrCode(qrcode: qrCode) {
		return await prisma.create({
			data: qrcode,
			select: selectedData,
		});
	}
}