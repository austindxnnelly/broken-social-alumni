var express = require('express');
const { req } = require('express');
const { body, validationResult } = require('express-validator');
var search_controller = require('../controllers/search_controller');

const user_json = require('../models/user_schema');
const alumni_json = require('../models/alumni_schema');
const PostDB = require('../models/post_schema');
//const user_s = require('../models/user');


const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Social Alumni' });
  console.log(req.user)
});

router.get('/search', async(req, res) => {
  let users = await user_json.find({});
  let search = req.query.search;

  res.render('search' , {
    usersearch: search_controller.filter_users(search, users), isAuthenticated: true
  });
})



router.get('/message', (req, res) => {

});

router.get('/nav', (req, res) => {
  if (user) {
    const isAuthenticated = req.isAuthenticated();
    res.render('nav', { isAuthenticated });
  } else {
    res.render('nav')
  }
});

router.post('/logout', function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
  });

router.get('/logout', function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/home/signin');
  });
  });


var auth = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.status(401).json("not authenticated!");
}

router.get('/profile', auth, (req, res) => {
  res.render('profile', {isAuthenticated: true, title: "User Profile", lastname: req.user.last_name, firstname: req.user.first_name, email: req.user.email, profilePictures: req.user.profile_photo});
  console.log(req.user);
  console.log(req.session.passport.user);
});

/*router.post('/profile', async (req, res) => {
  try {
    const user = await user_json.findOne(user_doc);
    const fname = user.first_name;
    const lname = user.last_name;
    
    // Handle file upload
    const profilePicture = req.files.profilePictures;
    const filename = 'profile-' + Date.now() + '-' + profilePicture.name;
    profilePicture.mv('public/profilePictures/' + filename, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Profile picture saved!');
      }
    });
    
    // Update user's profile picture in the database
    user.profile_picture = filename;
    await user.save();
    
    // Render the profile page with the updated profile picture
    res.redirect('/home/profile');
  } catch (error) {
    res.render('profile', {errors: 'An error occurred'})
  }
});*/

router.get('/feed', (req, res) => {
  res.render('feed', {isAuthenticated: true, title: "Timeline"});
});

router.post('/feed', async (req, res) => {
  // get the data from the request body 
  const post_document = {
      username_sent: req.user.email,
      message_content: req.body.content,
      date: new Date().getTime(),
  };
  let reciever = req.params.id

  console.log(req);
  
  // insert the data into the database
  const db_info = await PostDB.create(post_document);
  
  // print some stuff
  console.log(db_info, '/user/create-message response');
  
  // tell the client it worked!
  console.log('/' + reciever + '/all-messages');
  res.redirect('/home/feed');
})

router.get('/:id/all-posts', async (req, res) => {
  // query all the messages
  const sender = req.user.email;
  var postsSent = await PostDB.find({username_sent: sender});
  for(let i = 0; i < postsSent.length; i++){
      postsSent[i]["owner"] = true;
  }

  var userRecieved = await UserDB.findOne({email: sender});
  var nameRecieved = userRecieved["first_name"];

  console.log("USER: " + userRecieved);
  console.log("NAME: " + nameRecieved);

  const posts = postsSent;
  var sort_func = (a, b) => a.date - b.date;
  posts.sort(sort_func);



  console.log(posts);

  // respond to the client with the messages (as json)
  res.render('post_layout',{
      posts: posts,
      user: userRecieved,
      username: nameRecieved
  });

})


module.exports = router;

router.get('/groups', (req, res) => {
  res.render('groups', {isAuthenticated: true, title: "Groups"});
});
