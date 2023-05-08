var express = require('express');
const { req } = require('express');
const { body, validationResult } = require('express-validator');
var search_controller = require('../controllers/search_controller');

const user_json = require('../models/user_schema');
const alumni_json = require('../models/alumni_schema');
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


module.exports = router;

router.get('/groups', (req, res) => {
  res.render('groups', {isAuthenticated: true, title: "Groups"});
});
