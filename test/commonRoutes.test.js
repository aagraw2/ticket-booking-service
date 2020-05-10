const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

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

let userId;
let TicketIdOpen;
let TicketIdClosed;

describe('Tesing common API endpoints', () => {
    beforeAll(async () => {
        await dbHandler.connect();

        const testUserObj = new UserModel(testUser);
        const userResponse = await testUserObj.save();
        userId = userResponse._id;

        const testTicketClosedObj = new TicketModel(testTicketClosed);
        testTicketClosedObj.user_id = userId;
        const ticketResponseClosed = await testTicketClosedObj.save();
        TicketIdClosed = ticketResponseClosed._id;

        const testTicketOpenObj = new TicketModel(testTicketOpen);
        const ticketResponseOpen = await testTicketOpenObj.save();
        TicketIdOpen = ticketResponseOpen._id;
    });

    afterAll(async () => {
        await dbHandler.clearDatabase();
        await dbHandler.closeDatabase();
    });

    it('GET /tickets/closed', async (done) => {
        const server = request.agent(app);
        await server
            .get('/tickets/closed')
            .then((res) => {
                const { body } = res;
                expect(body.count).toBe(1);
                done();
            })
            .catch(done);
    });

    it('GET /tickets/open', async (done) => {
        const server = request.agent(app);
        await server
            .get('/tickets/closed')
            .then((res) => {
                const { body } = res;
                expect(body.count).toBe(1);
                done();
            })
            .catch(done);
    });

    it('GET /:ticket_id/get-status (Closed)', async (done) => {
        const server = request.agent(app);
        await server
            .get(`/${TicketIdClosed}/get-status`)
            .then((res) => {
                const { body } = res;
                expect(body.isBooked).toBe(true);
                done();
            })
            .catch(done);
    });

    it('GET /:ticket_id/get-status (Open)', async (done) => {
        const server = request.agent(app);
        await server
            .get(`/${TicketIdOpen}/get-status`)
            .then((res) => {
                const { body } = res;
                expect(body.isBooked).toBe(false);
                done();
            })
            .catch(done);
    });

    it('GET /:ticket_id/user (Closed)', async (done) => {
        const server = request.agent(app);
        await server
            .get(`/${TicketIdClosed}/get-user`)
            .then((res) => {
                const { body } = res;
                expect(body._id).toEqual(userId.toString());
                done();
            })
            .catch(done);
    });

    it('GET /:ticket_id/user (Open)', async (done) => {
        const server = request.agent(app);
        await server
            .get(`/${TicketIdOpen}/get-user`)
            .expect(400)
            .then((res) => {
                done();
            })
            .catch(done);
    });
});
