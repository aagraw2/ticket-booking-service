const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://ticket-booker:ticketBooker@ticket-information-oo1ok.mongodb.net/test?retryWrites=true&w=majority';

function connect() {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then((res, err) => {
        if (err) return reject(err);
        return res;
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };