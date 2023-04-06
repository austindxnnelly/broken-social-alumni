const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    phone_number: {type: Number, required: true},
    degree: {type: String, required: true},
    current_job: {type: String, required: false},
    year_graduated: {type: Number, required: false}
})

const alumni_schema = mongoose.model('alumni', alumniSchema);

module.exports = alumni_schema;