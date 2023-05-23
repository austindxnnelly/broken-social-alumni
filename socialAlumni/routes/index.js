var express = require('express');
const { req } = require('express');
const { body, validationResult } = require('express-validator');
var search_controller = require('../controllers/search_controller');

//const user_json = require('../models/user_schema');
const alumni_json = require('../models/alumni_schema');
const PostDB = require('../models/post_schema');
const USERDB = require('../models/user');
const group_json = require('../models/group_schema');


const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('profile');
  }
  else {
  res.render('index', { title: 'Social Alumni' });
}
});

router.get('/search', async(req, res) => {
  if (req.isAuthenticated()) {
    let users = await USERDB.find({});
    let search = req.query.search;
  
    res.render('search' , {
      usersearch: search_controller.filter_users(search, users), 
      isAuthenticated: true
    });
  }
  else {
  res.redirect("/home/");
}
});



router.get('/logout', function(req, res){
  if (req.isAuthenticated()) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/home/signin');
    });
  }
  else {
    res.redirect('/home/')
}

  });


var auth = function (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.status(401).json("not authenticated!");
}

router.get('/profile', async(req, res) => {
  if (req.isAuthenticated()) {
    let user = await USERDB.findOne({email: req.session.passport.user});
    
    res.render('profile', {
      isAuthenticated: true, 
      title: "User Profile", 
      lastname: user.last_name, 
      firstname: user.first_name, 
      email: user.email, 
      profilePictures: req.user.profile_photo
    });
  } else {
    res.redirect("/home/");
  }
});

router.get('/groups', async(req, res) => {
  if (req.isAuthenticated()) {
    let yourGroups = await group_json.find({members: req.user.email}); 
    let groups = await group_json.find({ members: { $ne: req.user.email }});
    
    res.render('groups', {
      yourGroups : yourGroups, 
      groups: groups, 
      isAuthenticated: true, 
      title: "Groups"
    });

  } else {
    res.redirect("/home/");
  }
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
  if (req.isAuthenticated()) {
    res.render('create_group', {
      isAuthenticated: true, 
      title: "Create Group"
    });
  } else {
    res.redirect("/home/");
}
});

router.get('/:id/join', async(req, res) => {
  if (req.isAuthenticated()) {
    let group = req.params.id
    // insert the data into the database
    const db_info = await group_json.findOneAndUpdate({name: group}, {$push: {members: req.user.email}});

    // tell the client it worked!
    res.redirect('/home/groups');
  } else {
    res.redirect("/home/");
  }
});


module.exports = router;

