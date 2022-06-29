import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient().qrCode;
import qr from 'qrcode';

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
	public async getQrCode(qrid: number) {
		return await prisma.findUnique({
			where: {
				id: qrid,
			},
			select: {path:true},
		});
	}
	public async createQrCode(data: any, family_member_id: number) {
		const strData = JSON.stringify(data);
		console.log(data)
		console.log(strData);
		qr.toFile(`./qrphotos/${family_member_id}.png`, strData, {}, function (err) {
			if (err) throw err
			// console.log('done')
		  });
		const code = {
			member_id: family_member_id,
			path: `./qrphotos/${family_member_id}.png`,
		};
		return await prisma.create({
			data: code,
			select: selectedData,
		});
	}
}

export default QrCode;