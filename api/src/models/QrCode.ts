import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient().qrCode;
const qr = require('qrcode');
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
	public async createQrCode(data: any) {
		let strData = JSON.stringify(data);
		qr.toFile('./qrphotos/filename.png', strData, {}, function (err) {
			if (err) throw err
			// console.log('done')
		});
	}
}