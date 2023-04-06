const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    username_sent: {type: String, required: true},
    username_recieved: {type: String, required: true},
    date: {type: Date, required: true}

})

const message_schema = mongoose.model('message', messageSchema);

module.exports = message_schema;