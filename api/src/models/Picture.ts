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
	public async getPicture(user_id: number) {
		return await prisma.findUnique({
			where: {
				user_id: user_id,
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
	public async updatePicture(user_id: number, path: string) {
		return await prisma.update({
			where: { user_id: user_id },
			data: { path: path },
		});
	}
}
export default Picture;
