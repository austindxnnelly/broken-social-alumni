const mongoose = require("mongoose");
const UserS = require('../models/user');


const replySchema = new mongoose.Schema({
    username_sent: {type: String, required: true},
    date: {type: Date, required: true},
    message_content: {type: String, required: true},
    owner: {type: Boolean},
    group: {type: String, required: true},
    parent_post: {type: String, required: true}


})

const reply_schema = mongoose.model('reply', replySchema);

module.exports = reply_schema;