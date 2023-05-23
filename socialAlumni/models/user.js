const mongoose = require("mongoose");
var passportLocal = require('passport-local-mongoose');
const { options } = require("../routes");

const testusers = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    phone_number: {type: Number, required: true},
    profile_photo: {type: String, required: false},
    points: {type: Number, required: false, default: 0},
    level: {type: String, required: true, default: "zero"},
});

testusers.plugin(passportLocal, { usernameField: 'email' });

const user_schema = mongoose.model('User', testusers);

module.exports = user_schema;