const mongoose = require('mongoose');
const TicketStatusHandler = require('../middleware/TicketStatusHandler');

const dbHandler = require('./dbHandler');

const UserModel = require('../models/User');
const TicketModel = require('../models/Ticket');

const testUser = {
    firstName: 'Amit',
    lastName: 'Ag',
    age: 24,
    gender: 'Male',
    mobileNumber: '+91-1234567890',
    emailId: 'a@b.com',
};

const testTicketClosed = {
    ticketNumber: 20,
    isBooked: true,
};

const testTicketOpen = {
    ticketNumber: 21,
    isBooked: false,
};

let testUserObj;
let testTicketClosedObj;
let testTicketOpenObj;

describe('Tesing admin API endpoints', () => {
    beforeAll(async () => {
        await dbHandler.connect();
    });
    beforeEach(async () => {
        testUserObj = new UserModel(testUser);
        const userResponse = await testUserObj.save();
        userId = userResponse._id;

        testTicketClosedObj = new TicketModel(testTicketClosed);
        testTicketClosedObj.user_id = userId;
        const ticketResponseClosed = await testTicketClosedObj.save();
        TicketIdClosed = ticketResponseClosed._id;

        testTicketOpenObj = new TicketModel(testTicketOpen);
        const ticketResponseOpen = await testTicketOpenObj.save();
        TicketIdOpen = ticketResponseOpen._id;
    });
    afterEach(async () => {
        await dbHandler.clearDatabase();
    });
    afterAll(async () => {
        await dbHandler.closeDatabase();
    });

    it('sets closed ticket to open', async (done) => {
        await TicketStatusHandler.setTicketOpen(testTicketClosedObj)
            .then((response) => {
                expect(testTicketClosedObj.isBooked).toBe(false);
                expect(testTicketClosedObj.user_id).toBe(null);
                done();
            });
    });

    it('sets open ticket to closed', async (done) => {
        await TicketStatusHandler.setTicketClosed(testTicketOpenObj, testUserObj)
            .then((response) => {
                expect(testTicketOpenObj.isBooked).toBe(true);
                expect(testTicketOpenObj.user_id).toBe(testUserObj._id);
                done();
            });
    });

    it('Updates closed ticket user details', async (done) => {
        testUserObj.firstName = 'Sumit';
        await TicketStatusHandler.setTicketClosed(testTicketOpenObj, testUserObj)
            .then((response) => {
                expect(testTicketOpenObj.isBooked).toBe(true);
                expect(testTicketOpenObj.user_id).toBe(testUserObj._id);
                expect(testUserObj.firstName).toBe('Sumit');
                done();
            });
    });
});
