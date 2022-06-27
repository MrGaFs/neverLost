import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient().feed;
import jwt from 'jsonwebtoken';
import config from '../config.js';

type Feed = {
	content: string;
	picture_id: number;
};
const selectedData = {
	id: true,
	content: true,
	picture_id: true,
};

class Feeds {
	public async getAllFeed() {
		return await prisma.findMany({ select: selectedData });
	}
	public async getFeed(id: number) {
		return await prisma.findUnique({
			where: { id: id },
			select: selectedData,
		});
	}
	public async createFeed(feed: Feed) {
		const res = await prisma.create({
			data: feed,
			select: { id: true },
		});
		return jwt.sign({
			id: res.id,
		}, config.JWT_SECRET);
	}
}

export default Feeds;
