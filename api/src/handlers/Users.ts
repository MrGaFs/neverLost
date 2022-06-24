import users from '../models/Users';
import express from 'express';
import jwt from 'jsonwebtoken';
import jwtAuth from '../middleware/jwtatuh';
import config from '../config';
const joi = require('../../node_modules/joi')

const usr = new users();

const createUser = async (req: express.Request, res: express.Response) => {
	try {
		const userSchema = {
			username: joi.string().required(),
			first_name: joi.string().required(),
			last_name: joi.string().required(),
			national_id: joi.string().required(),
			user_type: joi.string(),
			gender: joi.string().required(),
			phone: joi.string().required(),
			email: joi.string().required(),
			address: joi.string(),
			password: joi.string().required(),
		};
		const schemaResult = joi.validate(req.body, userSchema);
		if (schemaResult.error) {
			throw Error('Data is incomplete');
		}
		const {
			username,
			first_name,
			last_name,
			national_id,
			user_type,
			gender,
			phone,
			email,
			address,
			password,
		} = req.body;
		const ret = await usr.createUser({
			username: username, first_name: first_name, last_name: last_name,
			national_id: national_id,user_type:user_type, gender: gender, phone: phone, email: email,
			address: address, password: password
		})
		res.status(200).json({"token":ret});
	}
	catch (e) {
		res.status(500).json({ 'error': (e as Error).message });
	}
};

const getUserInfo = async (req: express.Request, res: express.Response) => {
	try {
		const token = (req.headers.authorization as string).split(' ')[1];
		if (token !== "undefined") {
			const header = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload;
			const ret = await usr.getUser(header.id);
			res.status(200).json(ret);
		}
	} catch (e) {
		res.status(500).json({ 'error': (e as Error).message });
	}
}

const login = async (req: express.Request, res: express.Response) => {
	try {
		const { national_id, password } = req.body;
		res.status(200).json({'token':await usr.login(national_id, password)});
	} catch (e) {
		res.status(500).json({ 'error': (e as Error).message });
	}
}

const deleteUser = async (req: express.Request, res: express.Response) => {
	try {
		const token = (req.headers.authorization as string).split(' ')[1];
		if (token !== "undefined") {
			const header = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload;
			const ret = await usr.deleteUser(header.id);
			res.status(200).json(ret);
		}
	} catch (e) {
		res.status(500).json({ 'error': (e as Error).message });
	}
}

const updateUser = async (req: express.Request, res: express.Response) => {
	try {
		const token = (req.headers.authorization as string).split(' ')[1];
		if (token !== "undefined") {
			const id = (jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload).id;
			res.status(200).json(await usr.updateUser(id, req.body));
		}
	} catch (e) {
		res.status(500).json({ 'error': (e as Error).message });
	}
}

const UserRouter = (app: express.Application) => {
	app.post('/user', createUser);
	app.get('/user', jwtAuth, getUserInfo);
	app.post('/login', login);
	app.delete('/user', jwtAuth, deleteUser);
	app.put('/user', jwtAuth, updateUser);
}
export default UserRouter;