import users, { Gender, userType } from "../models/Users";
import jwt, { verify } from 'jsonwebtoken';
import config from "../config";


describe("Testing models", () => {
	describe("Testing Users model", () => {
		// NOTE: initial testing data
		const usr = new users;
		const testUsers=[{
				username: "test",
				first_name: "testfn",
				last_name: "testln",
				national_id: "testni",
				user_type: userType.normal,
				gender: Gender.female,
				phone: 'number2',
				email: 'test@test.com',
				address: 'test adres',
				password: 'test password'
		}, {
				username: "test1",
				first_name: "testfn1",
				last_name: "testln1",
				national_id: "testni1",
				user_type: userType.normal,
				gender: Gender.male,
				phone: 'number',
				email: 'test1@test.com',
				address: 'tes1t adres',
				password: 'test1 password'
		}]
		const resUsers=[{
				id:1,
				username: "test",
				first_name: "testfn",
				last_name: "testln",
				national_id: "testni",
				user_type: userType.normal,
				gender: Gender.female,
				phone: 'number2',
				email: 'test@test.com',
				address: 'test adres',
		}, {
				id:2,
				username: "test1",
				first_name: "testfn1",
				last_name: "testln1",
				national_id: "testni1",
				user_type: userType.normal,
				gender: Gender.male,
				phone: 'number',
				email: 'test1@test.com',
				address: 'tes1t adres',
		}];


		it("listing all users when empty", async () => {
			const res = await usr.getUsers();
			expect(res).toEqual([]);
		});
		it("adding user", async () => {
			try {
				const res = await usr.createUser(testUsers[0]);
				expect(jwt.verify(res, config.JWT_SECRET)).toBeTruthy();
			}catch(e){
				throw e;
			}
		});
		it("adding user", async () => {
			try {
				const res = await usr.createUser(testUsers[1]);
				expect(jwt.verify(res, config.JWT_SECRET)).toBeTruthy();
			}catch(e){
				throw e;
			}
		});

		it("listing all users after adding", async () => {
			const res = await usr.getUsers();
			expect(res).toEqual(resUsers);
		});

		it("updating user", async () => {
			const res = await usr.updateUser(1, {first_name: "test2"});
			resUsers[0].first_name = "test2";
			expect(res).toEqual(resUsers[0]);
		});

		it("deleting user", async () => {
			const res = await usr.deleteUser(2);
			expect(res).toEqual(resUsers[1]);
		});

		it("Login", async () => {
			const res = await usr.login(testUsers[0].national_id, testUsers[0].password);
			if (res) {
				expect(jwt.verify(res, config.JWT_SECRET)).toBeTruthy();
			} else throw Error("Login failed");
		});


	});
});