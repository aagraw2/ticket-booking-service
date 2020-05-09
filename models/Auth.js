const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    apiKey: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Auth', authSchema);
