const express = require('express');
const { req } = require('express');
const MessageDB = require('../models/message_schema');
const UserDB = require('../models/user');

const router = express.Router();

//MessageDB.insertMany({username_sent: 'mmmm@mmmm', username_recieved: 'a@a', date: '2023-04-23T22:53:23.000+00:00', message_content:"howdy"});
//MessageDB.insertMany({username_sent: 'a@a', username_recieved: 'mmmm@mmmm', date: '2023-04-23T22:21:23.000+00:00', message_content:"hi !!"});

router.get('/tmessages', async (req, res) => {
    res.render('message_layout', { title: 'Messages' });
 });

router.get('/:id/all-messages', async (req, res) => {
    // query all the messages
    const reciever = req.params.id;
    const sender = req.user.email;
    var messagesSent = await MessageDB.find({username_recieved: reciever , username_sent: sender});
    for(let i = 0; i < messagesSent.length; i++){
        messagesSent[i]["owner"] = true;
    }
    var messagesRecieved = await MessageDB.find({username_recieved: sender, username_sent: reciever});
    
    var userRecieved = await UserDB.findOne({email: sender});
    var nameRecieved = userRecieved["first_name"];

    console.log("USER: " + userRecieved);
    console.log("NAME: " + nameRecieved);

    const messages = messagesSent.concat(messagesRecieved);
    var sort_func = (a, b) => b.date - a.date;
    messages.sort(sort_func);



    console.log(messages);

    // respond to the client with the messages (as json)
    res.render('message_layout',{
        messages: messages,
        recieved: reciever,
        username: nameRecieved
    });

})

router.post('/:id/all-messages', async (req, res) => {
    // get the data from the request body 
    const message_document = {
        username_sent: req.user.email,
        username_recieved: req.params.id,
        message_content: req.body.content,
        date: new Date().getTime(),
    };
    let reciever = req.params.id

    console.log(req);
    
    // insert the data into the database
    const db_info = await MessageDB.create(message_document);
    
    // print some stuff
    console.log(db_info, '/user/create-message response');
    
    // tell the client it worked!
    console.log('/' + reciever + '/all-messages');
    res.redirect('/home/' + reciever + '/all-messages');
})


module.exports = router;

