const mongoose = require('mongoose');
const TicketModel = require('../models/Ticket');


const testTicket = {
    ticketNumber: 20,
    isBooked: true
};


describe('TesingModel Ticket', () => {
    let connection;
    beforeAll(async () => {
        connection = await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
            }
        })
    });

    afterAll(async () => {
        connection.close()
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