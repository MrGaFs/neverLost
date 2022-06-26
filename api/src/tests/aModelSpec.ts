import users, { Gender, userType } from '../models/Users';
import jwt from 'jsonwebtoken';
import config from '../config';
import FamilyAdmin from '../models/FamilyAdmin';
import Picture from '../models/Picture';
import FamilyMember from '../models/FamilyMembers';

describe('Testing models', () => {
	describe('Testing Users model', () => {
		// NOTE: initial testing data
		const usr = new users();
		const testUsers = [
			{
				username: 'test',
				first_name: 'testfn',
				last_name: 'testln',
				national_id: 'testni',
				user_type: userType.normal,
				gender: Gender.female,
				phone: 'number2',
				email: 'test@test.com',
				address: 'test adres',
				password: 'test password',
			},
			{
				username: 'test1',
				first_name: 'testfn1',
				last_name: 'testln1',
				national_id: 'testni1',
				user_type: userType.normal,
				gender: Gender.male,
				phone: 'number',
				email: 'test1@test.com',
				address: 'tes1t adres',
				password: 'test1 password',
			},
		];
		const resUsers = [
			{
				id: 1,
				username: 'test',
				first_name: 'testfn',
				last_name: 'testln',
				national_id: 'testni',
				user_type: userType.normal,
				gender: Gender.female,
				phone: 'number2',
				email: 'test@test.com',
				address: 'test adres',
			},
			{
				id: 2,
				username: 'test1',
				first_name: 'testfn1',
				last_name: 'testln1',
				national_id: 'testni1',
				user_type: userType.normal,
				gender: Gender.male,
				phone: 'number',
				email: 'test1@test.com',
				address: 'tes1t adres',
			},
		];
		it('listing all users when empty', async () => {
			const res = await usr.getUsers();
			expect(res).toEqual([]);
		});
		it('adding user', async () => {
			const res = await usr.createUser(testUsers[0]);
			expect(res).toBeTruthy();
		});
		it('adding user', async () => {
			const res = await usr.createUser(testUsers[1]);
			expect(jwt.verify(res, config.JWT_SECRET)).toBeTruthy();
		});
		it('listing all users after adding', async () => {
			const res = await usr.getUsers();
			expect(res).toEqual(resUsers);
		});
		it('updating user', async () => {
			const res = await usr.updateUser(1, { first_name: 'test2' });
			resUsers[0].first_name = 'test2';
			expect(res).toEqual(resUsers[0]);
		});
		it('deleting user', async () => {
			const res = await usr.deleteUser(2);
			expect(res).toEqual(resUsers[1]);
		});
		it('Login', async () => {
			const res = await usr.login(
				testUsers[0].national_id,
				testUsers[0].password
			);
			if (res) {
				expect(jwt.verify(res, config.JWT_SECRET)).toBeTruthy();
			} else throw Error('Login failed');
		});
	});
	const usr = new users();
	describe('Testing Picture model', () => {
		beforeAll(() => {
			const promises: Promise<string>[] = [];
			for (let i = 0; i < 5; i++) {
				promises.push(
					usr.createUser({
						username: `testsss${i}`,
						first_name: `testfn${i}`,
						last_name: `testni${i}`,
						national_id: `${i}${i}${i}${i}1234567890`,
						user_type: userType.normal,
						gender: Gender.male,
						email: `testemail${i}@neverlost.com`,
						phone: `01${i}${i}000000`,
						password: 'test password',
						address: 'adflkafdjalk',
					})
				);
			}
			Promise.all(promises).then();
		});
		const pic = new Picture();
		it('adding picture', async () => {
			const res = await pic.createPicture({
				user_id: 1,
				path: 'test path',
			});
			expect(res).toEqual({
				id: 1,
				user_id: 1,
				path: 'test path',
			});
		});
		it('adding picture 2nd', async () => {
			const res = await pic.createPicture({
				user_id: 3,
				path: 'test path2',
			});
			expect(res).toEqual({
				id: 2,
				user_id: 3,
				path: 'test path2',
			});
		});
		it('getting picture', async () => {
			const res = await pic.getPicture(1);
			expect(res).toEqual({
				id: 1,
				user_id: 1,
				path: 'test path',
			});
		});
		it('getting picture', async () => {
			const res = await pic.updatePicture(1, 'test path3');
			expect(res).toEqual({
				id: 1,
				user_id: 1,
				path: 'test path3',
			});
		});
	});
	describe('Testing Family Admin', () => {
		const admin = new FamilyAdmin();
		it('listing all users when empty', async () => {
			const res = await admin.getFamilyAdmins();
			expect(res).toEqual([]);
		});

		it('Adding Admin', async () => {
			const res = await admin.createFamilyAdmin({
				user_id: 3,
				membersCount: 5,
				picture_id: 2,
			});
			expect(res).toEqual({
				id: 1,
				user_id: 3,
				membersCount: 5,
				family_members: [],
				picture_id: 2,
			});
		});
		it('Adding Admin', async () => {
			const res = await admin.createFamilyAdmin({
				user_id: 4,
				membersCount: 5,
				picture_id: 1,
			});
			expect(res).toEqual({
				id: 2,
				user_id: 4,
				membersCount: 5,
				family_members: [],
				picture_id: 1,
			});
		});
		it('Update Admin', async () => {
			const res = await admin.updateFamilyAdmin(3, { membersCount: 5 });
			const test = {
				id: 1,
				user_id: 3,
				membersCount: 5,
				family_members: [],
				picture_id: 2,
			};
			expect(res).toEqual(test);
		});
		it('Delete Admin', async () => {
			const res = await admin.deleteFamilyAdmin(4);
			const test = {
				id: 2,
				user_id: 4,
				membersCount: 5,
				family_members: [],
				picture_id: 1,
			};
			expect(res).toEqual(test);
		});
	});
	describe('Testing Family Member', () => {
		const member = new FamilyMember();
		it('listing all users when empty', async () => {
			const res = await member.getFamilyMembers(1);
			expect(res).toEqual([]);
		});
		it('Adding family member', async () => {
			await member.addFamilyMember({
				family_admin_id: 1,
				medical_record: 'test medical record',
				phone: '0101010101',
				email: 'test@test.com',
				picture_id: 1,
			});
			const res = (await new FamilyAdmin().getFamilyAdmin(3))?.family_members;
			expect(res).toEqual([{
				id: 1,
				medical_record: 'test medical record',
				phone: '0101010101',
				email: 'test@test.com',
				picture_id: 1,
			}]);
		});
	});
});
