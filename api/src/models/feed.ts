import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient().feed;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';

type Feed = {
    content: string;
    picturePath: string;
};
const selectedData = {
    id: true,
    content: true,
    picturePath: true,
};

class Feeds {
    public async getAllFeed() {
        return await prisma.feed.findMany({ select: selectedData });
    }
    public async getFeed(id: number) {
        return await prisma.feed.findUnique({
            where: { id: id },
            select: selectedData,
        });
    }
    public async createFeed(feed: Feed) {
        const chFeed = { ...feed };
        const res = await prisma.feed.create({
            data: chFeed,
            select: { id: true },
        });
        return jwt.sign({
            id: res.id,
        }, config.JWT_SECRET);
    }
}

export default Feeds;
