const express = require('express');
const { req } = require('express');
const MessageDB = require('../models/message_schema');
const UserDB = require('../models/user');

const router = express.Router();

//MessageDB.insertMany({username_sent: 'mmmm@mmmm', username_recieved: 'a@a', date: '2023-04-23T22:53:23.000+00:00', message_content:"howdy"});
//MessageDB.insertMany({username_sent: 'a@a', username_recieved: 'mmmm@mmmm', date: '2023-04-23T22:21:23.000+00:00', message_content:"hi !!"});


router.get('/:id/all-messages', async (req, res) => {
    // query all the messages
    const reciever = req.params.id;
    const sender = req.user.email;
    var messagesSent = await MessageDB.find({username_recieved: reciever , username_sent: sender});
    for(let i = 0; i < messagesSent.length; i++){
        messagesSent[i]["owner"] = true;
    }
    var messagesRecieved = await MessageDB.find({username_recieved: sender, username_sent: reciever});
    
    var userRecieved = await UserDB.findOne({email: reciever});
    var nameRecieved = userRecieved["first_name"];

    console.log("USER: " + userRecieved);
    console.log("NAME: " + nameRecieved);

    const messages = messagesSent.concat(messagesRecieved);
    var sort_func = (a, b) => b.date - a.date;
    messages.sort(sort_func);

    if(messages.at(0)!=null){
        console.log(messages.at(0));
        let firstMessage = messages.at(0);
        if(firstMessage["owner"] == true){
            console.log("FIRST MEzsASAGEEEE OWNER");
            firstMessage["other_user"] = firstMessage["reciever"];
            console.log(firstMessage);
        }
    }

    var userMessagesRecieved = await MessageDB.find({username_recieved: sender});
    var usermessagesSent = await MessageDB.find({username_sent: sender});
    for(let i = 0; i < usermessagesSent.length; i++){
        usermessagesSent[i]["owner"] = true;
    }
    
   // var userRecieved = await UserDB.findOne({email: sender});
    //var nameRecieved = userMessagesRecieved["first_name"];

   // console.log("USER: " + userRecieved);
   // console.log("NAME: " + nameRecieved);

    const userMessages = usermessagesSent.concat(userMessagesRecieved);
    var sort_func = (a, b) => b.date - a.date;
    userMessages.sort(sort_func);

   let uniqueMessages = [];
    let otherUsers = [];
    for (let j = 0; j < userMessages.length; j++){
        if(userMessages[j].username_sent == sender){
            if(!otherUsers.includes(userMessages[j].username_recieved)){
                otherUsers.push(userMessages[j].username_recieved);
                userMessages[j].username_sent = userMessages[j].username_recieved;
                userMessages[j].username_recieved = sender;
                uniqueMessages.push(userMessages[j]);
            }
        } else {
            if(!otherUsers.includes(userMessages[j].username_sent)){
                otherUsers.push(userMessages[j].username_sent);
                uniqueMessages.push(userMessages[j]);
            }            
        }
    }
    //let firstMessage = messages[0];
    //console.log(uniqueMessages);
    //console.log(otherUsers);

  
    res.render('message_page', {isAuthenticated: true, uniquemessages: uniqueMessages, messages: messages, recieved: reciever, username: nameRecieved}); //, {messages: firstMessage, isAuthenticated: true, title: "Messages"});
 // });




   //console.log(messages);

    // respond to the client with the messages (as json)
    /*res.render('message_layout',{
        messages: messages,
        recieved: reciever,
        username: nameRecieved,
        isAuthenticated: true
    });*/

});

router.post('/:id/all-messages', async (req, res) => {
    // get the data from the request body 
    const message_document = {
        username_sent: req.user.email,
        username_recieved: req.params.id,
        message_content: req.body.content,
        date: new Date().getTime(),
    };
    let reciever = req.params.id

    if(message_document.message_content == ""){
        res.redirect('/home/' + reciever + '/all-messages');
    } else {
    console.log(req);
    
    // insert the data into the database
    const db_info = await MessageDB.create(message_document);
    
    // print some stuff
    console.log(db_info, '/user/create-message response');
    
    // tell the client it worked!
    console.log('/' + reciever + '/all-messages');
    res.redirect('/home/' + reciever + '/all-messages');
    }
});

router.get('/messages', async(req, res) => {
    const sender = req.user.email;

    var messagesSent = await MessageDB.find({username_sent: sender});
    for(let i = 0; i < messagesSent.length; i++){
        messagesSent[i]["owner"] = true;
    }
    var messagesRecieved = await MessageDB.find({username_recieved: sender});
    
    var userRecieved = await UserDB.findOne({email: sender});
    var nameRecieved = userRecieved["first_name"];

    console.log("USER: " + userRecieved);
    console.log("NAME: " + nameRecieved);

    const messages = messagesSent.concat(messagesRecieved);
    var sort_func = (a, b) => b.date - a.date;
    messages.sort(sort_func);

   let uniqueMessages = [];
    let otherUsers = [];
    for (let j = 0; j < messages.length; j++){
        if(messages[j].username_sent == sender){
            if(!otherUsers.includes(messages[j].username_recieved)){
                otherUsers.push(messages[j].username_recieved);
                messages[j].username_sent = messages[j].username_recieved;
                messages[j].username_recieved = sender;
                uniqueMessages.push(messages[j]);
            }
        } else {
            if(!otherUsers.includes(messages[j].username_sent)){
                otherUsers.push(messages[j].username_sent);
                uniqueMessages.push(messages[j]);
            }            
        }
    }
    //let firstMessage = messages[0];
    console.log(uniqueMessages);
    console.log(otherUsers);

    //console.log(uniqueMessages[0].username_sent)

    if(uniqueMessages[0] == undefined){
            res.render('message_search', {isAuthenticated: true});
    }else {



  
    res.redirect('/home/' + uniqueMessages[0].username_sent + '/all-messages');
    //, {messages: firstMessage, isAuthenticated: true, title: "Messages"});
    }
  });


module.exports = router;

