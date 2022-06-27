import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../server';
import config from '../config';

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

	// describe('Testing Picture Endpoint', () => {
	// 	it('Testing POST /picture', async () => {
	// 		const res = await request
	// 			.post('/picture')
	// 			.set('Content-Type', `multipart/form-data`)
	// 			.field('user_id', 7)
	// 			.attach('picture', 'pic.png');
	// 		expect(res.status).toBe(200);
	// 	});
	// 	it('Testing GET /picture/:id', async () => {
	// 		const res = await request
	// 			.get('/picture/');
	// 		expect(res.status).toBe(200);
	// 	});
	// 	it('Testing PUT /picture', async () => {
	// 		const res = await request
	// 			.put('/picture')
	// 			.send({
	// 				id: 7,
	// 				path: 'pic2.png',
	// 			});
	// 		expect(res.status).toBe(200);
	// 	});
	// });
});
