import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export type User = {
	username: string
	first_name: string
	last_name: string
	national_id: string
	gender: Gender
	phone: string
	email: string
	address: string
	password: string
}
const returnedUser = {
	id: true,
	username: true,
	first_name: true,
	last_name: true,
	national_id: true,
	gender: true,
	phone: true,
	email: true,
	address: true,
}
export enum Gender {
	male = "male",
	female = "female",
	other = "other"
}

class users {
	public async getUsers() {
		return await prisma.user.findMany({select:returnedUser})
	}
	public async getUser(id: number) {
		return await prisma.user.findUnique({ where: { id: id } , select:returnedUser})
	}
	public async createUser(user: User) {
		return await prisma.user.create({
			data: user, select:returnedUser 
		})
	}
	public async updateUser(id: number, data:any) {
		return await prisma.user.update({
			where: { id: id },
			data: data,
			select:returnedUser 
		})
	}
	public async deleteUser(id: number) {
		return await prisma.user.delete({where: {id: id}, select:returnedUser});
	}
}
export default users;