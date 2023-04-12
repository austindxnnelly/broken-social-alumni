const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    phone_number: {type: Number, required: true}
});

const user_schema = mongoose.model('user', userSchema);

module.exports = user_schema;