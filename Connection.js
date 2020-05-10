const mongoose = require('mongoose');

const DB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ticket-information-oo1ok.mongodb.net/test?retryWrites=true&w=majority`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: 'prod',
};

function connect() {
    mongoose.connect(DB_URI, options)
        .then((res, err) => {
            if (err) return reject(err);
            console.log(`Connection to database (${options.dbName}) established successfully`);
            return res;
        });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };
