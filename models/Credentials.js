const mongoose = require('mongoose');

const credentialsSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('Credentials', credentialsSchema);
