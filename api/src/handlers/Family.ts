import FamilyAdmin from '../models/FamilyAdmin';
import FamilyMember from '../models/FamilyMembers';
import express from 'express';
import jwtAuth from '../middleware/jwtatuh';
import jwt from 'jsonwebtoken';
import config from '../config';
import Joi from 'joi';

const fAdmin = new FamilyAdmin();
const fMemember = new FamilyMember();

const adminSchema = Joi.object({
	user_id: Joi.number().required(),
	membersCount: Joi.number().required(),
	picture_id: Joi.number().required(),
});
const memberSchema = Joi.object({
	family_admin_id: Joi.number().required(),
	medical_record: Joi.string(),
	phone: Joi.string().regex(/^\+20\d{10}$/).required(),
	email: Joi.string().required(),
	picture_id: Joi.number().required(),
});

const createFamilyAdmin = async (req: express.Request, res: express.Response) => {
	try {
		console.log('hello word');
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

const FamilyRouter = (app: express.Application) => {
	//family admin
	app.get('/family/admin', jwtAuth, getFamilyAdmin);
	app.put('/family/admin', jwtAuth, updateFamilyAdmin);
	app.post('/family/admin', jwtAuth, createFamilyAdmin);
	app.post('/family/members', jwtAuth, addFamilyMember);
	app.put('/family/members', jwtAuth, updateFamilyMember);
};
export default FamilyRouter;