import { PrismaClient } from '@prisma/client';
import users from './Users';
const prisma = new PrismaClient();
type family_Admin = {
	user_id: number,
	membersCount: number
	family_members: []
	picture_id: number
}
const selectedAdminData = {
	id: true,
	user_id: true,
	family_members_count: true,
	family_members: true,
	picture_id: true
};
class FamilyAdmin {
	prs = prisma.family_Admin;
	public async getFamilyAdmins() {
		return await this.prs.findMany({
			select: selectedAdminData,
		});
	}
	public async getFamilyAdmin(user_id: number) {
		return await this.prs.findUnique(
			{
				where: { user_id: user_id },
				select: selectedAdminData,
			}
		);
	}
	public async createFamilyAdmin(family_Admin: family_Admin) {
		try {
			const usr = new users();
			usr.updateUser(family_Admin.user_id, { user_type: 'family_admin' });
		} catch (e) {
			throw (e as Error).message;
		}
		return await this.prs.create({
			data: family_Admin,
			select: selectedAdminData
		});
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async updateFamilyAdmin(user_id: number, data: any) {
		return await this.prs.update({
			where: { user_id: user_id },
			data: data,
			select: selectedAdminData
		});
	}
	public async deleteFamilyAdmin(user_id: number) {
		return await this.prs.delete(
			{
				where: { user_id: user_id },
				select: selectedAdminData
			});
	}
}

export default FamilyAdmin;