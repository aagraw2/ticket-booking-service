const mongoose = require('mongoose');
const TicketModel = require('../models/Ticket');

const dbHandler = require('./dbHandler')

const testTicket = {
    ticketNumber: 20,
    isBooked: true
};


describe('TesingModel Ticket', () => {

    beforeAll(async () => {
        await dbHandler.connect();
    });

    afterAll(async () => {
        await dbHandler.clearDatabase();
        await dbHandler.closeDatabase();
    })

    it('create and save Ticket successfully', async () => {
        const testTicketObj = new TicketModel(testTicket);
        const response = await testTicketObj.save();

        expect(response._id).toBeDefined();
        expect(response.ticketNumber).toBe(20);

    });

    it('should have ticket number less than 40', async () => {
        const testTicketObj = new TicketModel(testTicket);
        testTicketObj.ticketNumber = 50;
        try {
            await testTicketObj.save();
        } catch (e) {
            expect(e.name).toBe('ValidationError')
        }

    });

})