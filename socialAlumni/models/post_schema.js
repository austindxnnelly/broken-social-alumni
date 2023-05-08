const mongoose = require("mongoose");
const UserS = require('../models/user');


const postSchema = new mongoose.Schema({
    username_sent: {type: String, required: true},
    date: {type: Date, required: true},
    message_content: {type: String, required: true},
    owner: {type: Boolean},
    group: {type: String, required: true}


})

const post_schema = mongoose.model('post', postSchema);

module.exports = post_schema;