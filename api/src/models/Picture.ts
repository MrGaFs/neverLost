import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient().picture;
type picture = {
	user_id: number;
	path: string;
};
const selectedData = {
	id: true,
	user_id: true,
	path: true,
};
class Picture {
	public async getPicture(picture_id: number) {
		return await prisma.findUnique({
			where: {
				id: picture_id,
			},
			select: selectedData,
		});
	}
	public async createPicture(picture: picture) {
		return await prisma.create({
			data: picture,
			select: selectedData,
		});
	}
}
export default Picture;
