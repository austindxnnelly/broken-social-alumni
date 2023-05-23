const express = require('express');
const { req } = require('express');
const MessageDB = require('../models/message_schema');
const UserDB = require('../models/user');
const PostDB = require('../models/post_schema');
const ReplyDB = require('../models/reply_schema');
var assign_badge = require('../public/javascripts/assign_badge')

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
  
  
    // respond to the client with the messages (as json)
    res.render('feed',{
        title: "Timeline",
        isAuthenticated: true,
        posts: posts,
        user: userRecieved,
        username: nameRecieved,
        group: group,
    });

});




router.post('/:id/feed', async (req, res) => {
    console.log("HERE");
  // get the data from the request body 
  const post_document = {
      username_sent: req.user.email,
      message_content: req.body.content,
      date: new Date().getTime(),
      group: req.params.id
  };
  group = req.params.id;
  user = req.user.email;

  //console.log(req);
  
  // insert the data into the database
  const db_info = await PostDB.create(post_document);
  var user_info = await UserDB.findOne({email: user});
  var user_points_prev = user_info["points"] ;
  var points = user_points_prev + 3;
  var level = assign_badge.reassign(points);
  const post_point_info = await UserDB.findOneAndUpdate({email: user}, {points: points, level: level});


  
  // tell the client it worked!
  res.redirect('/home/' + group + '/feed');
});

router.post('/:groupid/feed/:postid/reply', async (req, res) => {
    console.log("HERE");
    // get the data from the request body 
    const reply_document = {
        username_sent: req.user.email,
        date: new Date().getTime(),
        message_content: req.body.reply,
        group: req.params.groupid,
        parent_post: req.params.postid
    };
    group = req.params.groupid;
    post = req.params.postid;
    user = req.user.email;

    console.log(req.params.postid);
    
    // insert the data into the database
    const reply_info = await ReplyDB.create(reply_document);
    replyid = reply_info.id;
    
    const post_info = await PostDB.findOneAndUpdate({_id: post}, {$push: {replies: reply_document}});
    var user_info = await UserDB.findOne({email: user});
    var user_points_prev = user_info["points"] ;
    var points = user_points_prev + 2;
    var level = assign_badge.reassign(points);
    const post_point_info = await UserDB.findOneAndUpdate({email: user}, {points: points, level: level});

    // tell the client it worked!
    res.redirect('/home/' + group + '/feed');
  });


module.exports = router;