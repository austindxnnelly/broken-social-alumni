const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true}
})

const student_schema = mongoose.model('student', studentSchema);

module.exports = student_schema;