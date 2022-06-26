import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient().family_member;

type family_member = {
	family_admin_id: number,
	medical_record: string,
	phone:string,
	email:string,
	picture_id: number
}
const returnedData = {
	id: true,
	family_adming_id: true,
	medical_record: true,
	phone: true,
	email: true,
	picture_id: true
};

class FamilyMember{
	public async getFamilyMembers(family_admin_id: number) {
		return await prisma.findMany({
			where: { family_admin_id: family_admin_id },
			select: returnedData,
		});
	}
	public async addFamilyMember(family_member: family_member) {
		return await prisma.create({
			data: family_member,
			select: returnedData,
		});
	}
	public async deleteFamilyMember(id: number) {
		return await prisma.delete({
			where: { id: id },
			select: returnedData,
		});
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async updateFamilyMember(id: number, data: any) {
		return await prisma.update({
			where: { id: id },
			data: data,
			select: returnedData,
		});
	}
}
export default FamilyMember;
