const mongoose = require('mongoose');
const preValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "First Name cannot be left blank"]
    },
    lastName: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        min: [0, "Age cannot be less than 0"]
    },
    gender: {
        type: String,
        trim: true,
        enum: ['Male', 'Female', 'Others']
    },
    mobileNumber: {
        type: String,
        trim: true,
        unique: [true, "Mobile number already registered"]
    },
    emailId: {
        type: String,
        trim: true,
        unique: [true, "Email Id already registered"]
    }
})

userSchema.plugin(preValidator);
module.exports = mongoose.model('User', userSchema);