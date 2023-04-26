"use strict";

var express = require('express');

var _require = require('express'),
    req = _require.req;

var MessageDB = require('../models/message_schema');

var router = express.Router(); //MessageDB.insertMany({username_sent: 'mmmm@mmmm', username_recieved: 'a@a', date: '2023-04-23T22:53:23.000+00:00', message_content:"howdy"});
//MessageDB.insertMany({username_sent: 'a@a', username_recieved: 'mmmm@mmmm', date: '2023-04-23T22:21:23.000+00:00', message_content:"hi !!"});

router.get('/tmessages', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render('message_layout', {
            title: 'Messages'
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/:id/all-messages', function _callee2(req, res) {
  var reciever, sender, messagesSent, i, messagesRecieved, messages, sort_func;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // query all the messages
          reciever = req.params.id;
          sender = req.user.email;
          _context2.next = 4;
          return regeneratorRuntime.awrap(MessageDB.find({
            username_recieved: reciever,
            username_sent: sender
          }));

        case 4:
          messagesSent = _context2.sent;

          for (i = 0; i < messagesSent.length; i++) {
            messagesSent[i]["owner"] = true;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(MessageDB.find({
            username_recieved: sender,
            username_sent: reciever
          }));

        case 8:
          messagesRecieved = _context2.sent;
          messages = messagesSent.concat(messagesRecieved);

          sort_func = function sort_func(a, b) {
            return a.date - b.date;
          };

          messages.sort(sort_func);
          console.log(messages); // respond to the client with the messages (as json)

          res.render('message_layout', {
            messages: messages,
            recieved: reciever
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/:id/all-messages', function _callee3(req, res) {
  var message_document, reciever, db_info;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // get the data from the request body 
          message_document = {
            username_sent: req.user.email,
            username_recieved: req.params.id,
            message_content: req.body.content,
            date: new Date().getTime()
          };
          reciever = req.params.id;
          console.log(req); // insert the data into the database

          _context3.next = 5;
          return regeneratorRuntime.awrap(MessageDB.create(message_document));

        case 5:
          db_info = _context3.sent;
          // print some stuff
          console.log(db_info, '/user/create-message response'); // tell the client it worked!

          console.log('/' + reciever + '/all-messages');
          res.redirect('/home/' + reciever + '/all-messages');

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;