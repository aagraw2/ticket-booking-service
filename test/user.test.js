const mongoose = require('mongoose');
const UserModel = require('../models/User');

const dbHandler = require('./dbHandler')

const testUser = {
    firstName: 'Amit',
    lastName: 'Ag',
    age: 24,
    gender: 'Male',
    mobileNumber: '+91-1234567890',
    emailId: 'a@b.com'
};

describe('TesingModel User', () => {

    beforeAll(async () => {
        await dbHandler.connect();
    });

    afterAll(async () => {
        await dbHandler.clearDatabase();
        await dbHandler.closeDatabase();
    })

    it('create and save user successfully', async () => {
        const testUserObj = new UserModel(testUser);
        const response = await testUserObj.save();

        expect(response._id).toBeDefined();
        expect(response.firstName).toBe('Amit');

    });

    it('Should insert user with unique mobileNumber and emailId', async () => {
        const testUserObj = new UserModel(testUser);
        try {
            await testUserObj.save();
        } catch (e) {
            expect(e.name).toBe('ValidationError')
        }

    });

    it('Should contain firstName', async () => {
        const testUserObj = new UserModel(testUser);
        testUserObj.firstName = null;
        try {
            await testUserObj.save();
        } catch (e) {
            expect(e.name).toBe('ValidationError')
        }

    });

    it('Should have gender as Male/Female/Others only', async () => {
        const testUserObj = new UserModel(testUser);
        testUserObj.gender = 'NotENUM';
        try {
            await testUserObj.save();
        } catch (e) {
            expect(e.name).toBe('ValidationError')
        }
    });

})
