const mongoose = require('mongoose');
const app = require('../app');
let request = require('supertest')

const UserModel = require('../models/User');
const TicketModel = require('../models/Ticket');

const testUser = {
    firstName: 'Amit',
    lastName: 'Ag',
    age: 24,
    gender: 'Male',
    mobileNumber: '+91-1234567890',
    emailId: 'a@b.com'
};

const testTicketClosed = {
    ticketNumber: 20,
    isBooked: true
};

const testTicketOpen = {
    ticketNumber: 21,
    isBooked: false
};

describe('Tesing common API endpoints', () => {
    let connection, userResponse, ticketResponseClosed, ticketResponseOpen;
    beforeAll(async () => {
        connection = await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
            }
        })

        const testUserObj = new UserModel(testUser);
        userResponse = await testUserObj.save();

        const testTicketClosedObj = new TicketModel(testTicketClosed);
        testTicketClosedObj.user_id = userResponse._id;
        ticketResponseClosed = await testTicketClosedObj.save();

        const testTicketOpenObj = new TicketModel(testTicketOpen);
        ticketResponseOpen = await testTicketOpenObj.save();

    });

    afterAll(async () => {
        connection.close()
    })


    it('GET /tickets/closed', async (done) => {
        const server = request.agent(app);
        await server
            .get('/tickets/closed')
            .then((res) => {
                const body = res.body;
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
                const body = res.body;
                expect(body.count).toBe(1);
                done();
            })
            .catch(done);
    });

    it('GET /:ticket_id/get-status (Closed)', async (done) => {
        const server = request.agent(app);
        await server
            .get(`/${ticketResponseClosed._id}/get-status`)
            .then((res) => {
                const body = res.body;
                expect(body.isBooked).toBe(true);
                done();
            })
            .catch(done);
    });

    it('GET /:ticket_id/get-status (Open)', async (done) => {
        const server = request.agent(app);
        await server
            .get(`/${ticketResponseOpen._id}/get-status`)
            .then((res) => {
                const body = res.body;
                expect(body.isBooked).toBe(false);
                done();
            })
            .catch(done);
    });

    it('GET /:ticket_id/user (Closed)', async (done) => {
        const server = request.agent(app);
        await server
            .get(`/${ticketResponseClosed._id}/get-user`)
            .then((res) => {
                const body = res.body;
                expect(body._id).toEqual(userResponse._id.toString());
                done();
            })
            .catch(done);
    });

    it('GET /:ticket_id/user (Open)', async (done) => {
        const server = request.agent(app);
        await server
            .get(`/${ticketResponseOpen._id}/get-user`)
            .then((res) => {
                const body = res.body;
                expect(body).toEqual({})
                done();
            })
            .catch(done);
    });
})
