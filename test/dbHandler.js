const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();


module.exports.connect = async () => {
    const URI = await mongod.getConnectionString();

    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    };

    await mongoose.connect(URI, options);
};


module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};


module.exports.clearDatabase = async () => {
    const { collections } = mongoose.connection;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};
