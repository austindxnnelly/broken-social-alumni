var express = require('express');
const { req } = require('express');
const { body, validationResult } = require('express-validator');
var search_controller = require('../controllers/search_controller');

const user_json = require('../models/user_schema');
const alumni_json = require('../models/alumni_schema');
const PostDB = require('../models/post_schema');
//const user_s = require('../models/user');
const group_json = require('../models/group_schema');


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



router.get('/groups', async(req, res) => {
  let groups = await group_json.find({});

  res.render('groups', {groups : groups, isAuthenticated: true, title: "Groups"});
});

router.post('/create-group', async(req, res) => {
  const group_document = {
    name: req.body.group_name,
    description: req.body.group_description,
    members: req.user.email
  }

    const db_info = await group_json.create(group_document);
    res.redirect('/home/groups');
});


router.get('/create-group', async(req, res) => {
  res.render('create_group', {isAuthenticated: true, title: "Create Group"});
});

router.get('/:id/join', async(req, res) => {
  let group = req.params.id
// insert the data into the database
const db_info = await group_json.findOneAndUpdate({name: group}, {$push: {members: req.user.email}});

// tell the client it worked!
res.redirect('/home/' + group + '/feed');
});


module.exports = router;

