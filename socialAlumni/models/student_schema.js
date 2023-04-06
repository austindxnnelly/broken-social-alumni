const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    phone_number: {type: Number, required: true},
    major: {type: String, required: true},
    interests: {type: String, required: false},
    graduation_year: {type: Number, required: false}
})

const student_schema = mongoose.model('student', studentSchema);

module.exports = student_schema;