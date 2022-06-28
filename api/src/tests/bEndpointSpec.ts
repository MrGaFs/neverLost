import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../server';
import config from '../config';
import path from 'path';
import fs from 'fs';
import e from 'express';

const request = supertest(app);

describe('Testing Main api page', () => {
	it('Testing Get /', async () => {
		const res = await request.get('/');
		expect(res.status).toBe(200);
	});

	let jwtToken: string;

	describe('Testing User Endpoint', () => {
		it('Testing POST /user', async () => {
			const response = await request.post('/user').send({
				username: 'test1',
				first_name: 'testfn',
				last_name: 'testln',
				national_id: '12345678901234',
				user_type: 'normal',
				gender: 'female',
				phone: '+201234567890',
				email: 'test@test.com1',
				address: 'test adres',
				password: 'test password',
			});
			expect(response.status).toBe(200);
			jwtToken = response.body.token;
		});
		it('Testing POST /login', async () => {
			const response = await request.post('/login').send({
				national_id: '12345678901234',
				password: 'test password',
			});
			expect(
				jwt.verify(response.body.token, config.JWT_SECRET)
			).toBeTruthy();
		});
		it('Testing GET /user', async () => {
			const response = await request
				.get('/user')
				.set('authorization', `Bearer ${jwtToken}`);
			expect(response.body).toEqual({
				id: 8,
				username: 'test1',
				first_name: 'testfn',
				last_name: 'testln',
				national_id: '12345678901234',
				user_type: 'normal',
				gender: 'female',
				phone: '+201234567890',
				email: 'test@test.com1',
				address: 'test adres',
			});
		});
		it('Testing PUT /user', async () => {
			const res = await request
				.put('/user')
				.set('authorization', `Bearer ${jwtToken}`)
				.send({
					username: 'test1au',
					gender: 'male',
					email: 'testau@test.com1',
				});
			expect(res.body).toEqual({
				id: 8,
				username: 'test1au',
				first_name: 'testfn',
				last_name: 'testln',
				national_id: '12345678901234',
				user_type: 'normal',
				gender: 'male',
				phone: '+201234567890',
				email: 'testau@test.com1',
				address: 'test adres',
			});
		});
		it('Testing DELETE /user', async () => {
			const res = await request
				.delete('/user')
				.set('authorization', `Bearer ${jwtToken}`);
			expect(res.body).toEqual({
				id: 8,
				username: 'test1au',
				first_name: 'testfn',
				last_name: 'testln',
				national_id: '12345678901234',
				user_type: 'normal',
				gender: 'male',
				phone: '+201234567890',
				email: 'testau@test.com1',
				address: 'test adres',
			});
		});
	});

	/*Untill fix picture problem and check the picture model*/

	describe('Testing Picture Endpoint', () => {
		it('Testing POST /picture', async () => {
			const res = await request
				.post('/picture')
				.set('Content-Type', `multipart/form-data`)
				.field('user_id', 7)
				.attach('picture', fs.readFileSync(path.resolve('./src/tests/pic2.jpg')), 'pic2.jpg');
			expect(res.status).toBe(200);
			console.log(res.body);
		});
		it('Testing GET /picture/:id', async () => {
			const res = await request
				.get('/picture/3');
			expect(res.status).toBe(200);
		});
	});

	describe('Testing Family Admin', () => {
		it('Testing POST /family/admin', async () => {
			const res = await request.post('/family/admin')
				.set('authorization', `Bearer ${jwtToken}`)
				.send({
				user_id: 7,
				membersCount: 3,
				picture_id: 3,
			});
			// console.log(res.body);
			expect(res.body).toEqual({
				id: 3,
				user_id: 7,
				membersCount: 3,
				family_members: [],
				picture_id: 3,
			});
		});

		let adminjwttoken = jwt.sign({
			id: 7,
		}, config.JWT_SECRET);
		it('Testing GET /family/admin', async () => {
			const res = await request
				.get('/family/admin')
				.set('authorization', `Bearer ${adminjwttoken}`);
			expect(res.body).toEqual({
				user_id: 7,
				membersCount: 3,
				family_members: [],
				picture_id: 3,
			});
		});
		it('Testing PUT /family/admin', async () => {
			const res = await request
			.put('/family/admin')
			.set('authorization', `Bearer ${adminjwttoken}`)
			.send({
				membersCount: 2,
			});
			expect(res.body).toEqual({
				id: 3,
				user_id: 7,
				membersCount: 2,
				family_members: [],
				picture_id: 3,
			});
		});
		let testToken = jwt.sign({
			id: 3,
		}, config.JWT_SECRET);
		it('Testing GET with already intiated account /family/admin', async () => {
			const res = await request
				.get('/family/admin')
				.set('authorization', `Bearer ${testToken}`);
			expect(res.status).toBe(200);
			// console.log(res.body);
		});
	})

	describe('Testing Family Members', () => {
		it('Testing POST /family/members', async () => {
			const res = await request.post('/family/members')
				.set('authorization', `Bearer ${jwtToken}`)
				.send({
					family_admin_id: 3,
					medical_record: 'testing post api',
					phone: '+201026027754',
					email: 'fmtestapi@test.1com',
					picture_id: 2,
				});
			expect(res.status).toBe(200);
			// console.log(res.body);
		});
		it('Testing PUT /family/members', async () => {
			const res = await request.put('/family/members')
				.set('authorization', `Bearer ${jwtToken}`)
				.send({
					id: 2,
					medical_record: 'testing put api',
					email: 'fmputapi@test.1net',
				});
			expect(res.body).toEqual({
				id: 2,
				family_admin_id: 3,
				medical_record: 'testing put api',
				phone: '+201026027754',
				email: 'fmputapi@test.1net',
				picture_id: 2,
			});
		});
	})
});
