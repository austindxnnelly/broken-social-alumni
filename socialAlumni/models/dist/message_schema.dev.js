"use strict";

var mongoose = require("mongoose");

var UserS = require('../models/user');

var messageSchema = new mongoose.Schema({
  username_sent: {
    type: String,
    required: true
  },
  username_recieved: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  message_content: {
    type: String,
    required: true
  },
  owner: {
    type: Boolean
  }
});
var message_schema = mongoose.model('message', messageSchema);
module.exports = message_schema;