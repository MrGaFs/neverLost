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
				national_id: 'testni122',
				user_type: 'normal',
				gender:'female',
				phone: 'number21',
				email: 'test@test.com1',
				address: 'test adres',
				password: 'test password'
			});
			expect(response.status).toBe(200);
			jwtToken = response.body.token;
		});
		it('Testing POST /login', async () => {
			const response = await request.post('/login').send({
				national_id: 'testni1',
				password: 'test password'
			});
			expect(jwt.verify(response.body.token, config.JWT_SECRET)).toBeTruthy();
		});
		it('Testing GET /user', async () => {
			const response = await request.get('/user').
				set('authorization', `Bearer ${jwtToken}`);
			expect(response.body).toEqual({
				id: 8,
				username: 'test1',
				first_name: 'testfn',
				last_name: 'testln',
				national_id: 'testni122',
				user_type: 'normal',
				gender:'female',
				phone: 'number21',
				email: 'test@test.com1',
				address: 'test adres',
			}
			);

		});
	});
});