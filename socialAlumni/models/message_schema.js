const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    username_sent: {type: mongoose.Schema.Types.user, required: true},
    username_recieved: {type: mongoose.Schema.Types.user, required: true},
    date: {type: Date, required: true}

})

const message_schema = mongoose.model('message', messageSchema);

module.exports = message_schema;