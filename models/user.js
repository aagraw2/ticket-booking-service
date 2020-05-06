const mongoose = require('mongoose');
const preValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: { type: Number, min: 0 },
    gender: { type: String, enum: ['Male', 'Female', 'Others'] },
    mobileNumber: { type: String, unique: true },
    emailId: { type: String, unique: true }
})

userSchema.plugin(preValidator);
module.exports = mongoose.model('User', userSchema);