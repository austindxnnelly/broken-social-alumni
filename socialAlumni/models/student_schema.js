const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    major: {type: String, required: true},
    interests: {type: String, required: false},
    graduation_year: {type: Number, required: false}
})

const student_schema = mongoose.model('student', studentSchema);

module.exports = student_schema;