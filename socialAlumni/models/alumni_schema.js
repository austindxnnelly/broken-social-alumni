const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    degree: {type: String, required: true},
    current_job: {type: String, required: false},
    year_graduated: {type: Number, required: false}
})

const alumni_schema = mongoose.model('alumni', alumniSchema);

module.exports = alumni_schema; 