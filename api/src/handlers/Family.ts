import FamilyAdmin from '../models/FamilyAdmin';
import FamilyMember from '../models/FamilyMembers';
import express from 'express';
import jwtAuth from '../middleware/jwtatuh';
import jwt from 'jsonwebtoken';
import config from '../config';
import Joi from 'joi';
import Qr from '../models/QrCode';
import path from 'path';

const fAdmin = new FamilyAdmin();
const fMemember = new FamilyMember();
const qr = new Qr();

const adminSchema = Joi.object({
	user_id: Joi.number().required(),
	membersCount: Joi.number().required(),
	picture_id: Joi.number().required(),
});
const memberSchema = Joi.object({
	family_admin_id: Joi.number().required(),
	fmUsername: Joi.string().required(),
	medical_record: Joi.string(),
	phone: Joi.string().regex(/^\+20\d{10}$/).required(),
	email: Joi.string().required(),
	picture_id: Joi.number().required(),
});

const createFamilyAdmin = async (req: express.Request, res: express.Response) => {
	try {
		await adminSchema.validateAsync(req.body);
		const ret = await fAdmin.createFamilyAdmin(req.body);
		res.status(200).json(ret);
	} catch (e) {
		res.status(500).send((e as Error).message);
	}
};
const addFamilyMember = async (req: express.Request, res: express.Response) => {
	try {
		await memberSchema.validateAsync(req.body);
		const ret = await fMemember.addFamilyMember(req.body);
		res.status(200).json(ret);
	} catch (e) {
		res.status(500).send((e as Error).message);
	}
};
const getFamilyAdmin = async (req: express.Request, res: express.Response) => {
	try {
		let header: jwt.JwtPayload; 
		const token = (req.headers.authorization as string).split(' ')[1];
		if (token !== 'undefined') {
			header = jwt.verify(
				token,
				config.JWT_SECRET
			) as jwt.JwtPayload;
			const ret = await fAdmin.getFamilyAdmin(header.id);
			res.status(200).json(ret);
		}
	} catch (e) {
		res.status(500).send((e as Error).message);
	}
};
const updateFamilyAdmin = async (req: express.Request, res: express.Response) => {
	try {
		let header: jwt.JwtPayload;
		const token = (req.headers.authorization as string).split(' ')[1];
		if (token !== 'undefined') {
			header = jwt.verify(
				token,
				config.JWT_SECRET
			) as jwt.JwtPayload;
			const ret = await fAdmin.updateFamilyAdmin(header.id, req.body);
			res.status(200).json(ret);
		}
	} catch (e) {
		res.status(500).send((e as Error).message);
	}
};
const updateFamilyMember = async (req: express.Request, res: express.Response) => {
	try {
		const { id, ...data } = req.body;
		const ret = await fMemember.updateFamilyMember(id, data);
		res.status(200).json(ret);
	}
	catch (e) {
		res.status(500).send((e as Error).message);
	}
};

const getQrCode = async (req: express.Request, res: express.Response) => {
	try {
		const ret = await qr.getQrCode(parseInt(req.params.id as string));
		if(!ret)
			throw new Error('No QrCode');
		res.status(200).sendFile(path.resolve(ret.path));
	}
	catch (e) {
		res.status(500).send((e as Error).message);
	}
}

const FamilyRouter = (app: express.Application) => {
	//family admin
	app.get('/family/admin', jwtAuth, getFamilyAdmin);
	app.put('/family/admin', jwtAuth, updateFamilyAdmin);
	app.post('/family/admin', jwtAuth, createFamilyAdmin);
	app.post('/family/members', jwtAuth, addFamilyMember);
	app.put('/family/members', jwtAuth, updateFamilyMember);
	app.get('/family/members/qrcode/:id', jwtAuth, getQrCode)
};
export default FamilyRouter;