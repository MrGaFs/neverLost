import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export enum userType {
	normal = 'normal',
	family_Admin = 'family_admin',
	family_member = 'family_member',
}

export enum Gender {
	male = 'male',
	female = 'female',
	other = 'other',
}

export type User = {
	username: string;
	first_name: string;
	last_name: string;
	national_id: string;
	user_type: userType;
	gender: Gender;
	phone: string;
	email: string;
	address: string;
	password: string;
};
const returnedUser = {
	id: true,
	username: true,
	first_name: true,
	last_name: true,
	national_id: true,
	gender: true,
	user_type: true,
	phone: true,
	email: true,
	address: true,
};

const bcrypt_salt = config.BCRYPT_SALT,
	bcrypt_rounds = config.BCRYPT_ROUNDS;

const hashPass = async (password: string): Promise<string> => {
	return await bcrypt.hash(password + bcrypt_salt, bcrypt_rounds);
};

class users {
	public async getUsers() {
		return await prisma.user.findMany({ select: returnedUser });
	}
	public async getUser(id: number) {
		return await prisma.user.findUnique({
			where: { id: id },
			select: returnedUser,
		});
	}
	public async createUser(user: User) {
		const chUser = { ...user };
		chUser.password = await hashPass(chUser.password);
		const res = await prisma.user.create({
			data: chUser,
			select: { id: true, national_id: true, user_type: true },
		});
		return jwt.sign(
			{
				id: res.id,
				national_id: res.national_id,
				user_type: res.user_type,
			},
			config.JWT_SECRET
		);
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async updateUser(id: number, data: any) {
		return await prisma.user.update({
			where: { id: id },
			data: data,
			select: returnedUser,
		});
	}

	public async deleteUser(id: number) {
		return await prisma.user.delete({
			where: { id: id },
			select: returnedUser,
		});
	}

	public async login(national_id: string, password: string) {
		try {
			const res = await prisma.user.findUnique({
				where: {
					national_id: national_id,
				},
				select: {
					id: true,
					national_id: true,
					user_type: true,
					password: true,
				},
			});
			const isValid = res
				? await bcrypt.compare(password + bcrypt_salt, res.password)
				: false;
			if (res && isValid) {
				return jwt.sign(
					{
						id: res.id,
						national_id: res.national_id,
						user_type: res.user_type,
					},
					config.JWT_SECRET
				);
			} else return null;
		} catch (e) {
			throw Error('Login Faild wrong national id or password');
		}
	}
}
export default users;
