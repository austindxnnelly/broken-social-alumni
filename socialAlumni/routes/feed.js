const express = require('express');
const { req } = require('express');
const MessageDB = require('../models/message_schema');
const UserDB = require('../models/user');
const PostDB = require('../models/post_schema');

const router = express.Router();


router.get('/:id/feed', async(req, res) => {
    // query all the messages
    const group = req.params.id;
    const sender = req.user.email;
    var postsSent = await PostDB.find({group: group});
    //for(let i = 0; i < postsSent.length; i++){
    //    postsSent[i]["owner"] = true;
    //}
  
    var userRecieved = await UserDB.findOne({email: sender});
    var nameRecieved = userRecieved["first_name"];
  
   // console.log("USER: " + userRecieved);
    //console.log("NAME: " + nameRecieved);
  
    const posts = postsSent;
    var sort_func = (a, b) => b.date - a.date;
    posts.sort(sort_func);
  
  
  
    console.log(posts);
  
    // respond to the client with the messages (as json)
    res.render('feed',{
        title: "Timeline",
        isAuthenticated: true,
        posts: posts,
        user: userRecieved,
        username: nameRecieved,
        group: group
    });

});




router.post('/:id/feed', async (req, res) => {
  // get the data from the request body 
  const post_document = {
      username_sent: req.user.email,
      message_content: req.body.content,
      date: new Date().getTime(),
      group: req.params.id
  };
  group = req.params.id;

  console.log(req);
  
  // insert the data into the database
  const db_info = await PostDB.create(post_document);
  
  // tell the client it worked!
  res.redirect('/home/' + group + '/feed');
});



module.exports = router;