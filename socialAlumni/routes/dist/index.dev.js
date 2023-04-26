"use strict";

var express = require('express');

var _require = require('express'),
    req = _require.req;

var _require2 = require('express-validator'),
    body = _require2.body,
    validationResult = _require2.validationResult;

var user_json = require('../models/user_schema');

var alumni_json = require('../models/alumni_schema');

var router = express.Router();
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Social Alumni'
  });
  console.log(req.user);
});
/*router.get('/signin', (req, res) => {
  res.render('signin', {title: 'Sign In' });
});

router.post('/signin', 
  body("inputEmail", "Please enter a valid email").isLength({min: 1}),
  body("inputPassword", "Please enter a valid password").isLength({min: 1}),

  async (req, res) => {
    const user_doc = {
      email: req.body.inputEmail,
      password: req.body.inputPassword,
    };

  const result= validationResult(req);
  var errors = result.errors;

  if (errors.length !== 0) {
    res.render('signin', {errors: errors[0].msg})
  } else {
    try {
      const user = await user_json.findOne(user_doc)
      if (!user) {
        res.render('signin', {errors: 'Incorrect username/password'})
      } else {
          res.render('profile', {isAuthenticated: true})
          res.redirect('/profile');
        }
      } catch (error) {
        res.render('signin', {errors: 'An error occured'})
    }
  } 
});



router.get('/create', (req, res) => {
  res.render('create', {title: "Create Account"});
});


router.post('/create', 
  body("inputFirstName", "Please enter valid first name").isLength({min: 1}),
  body("inputLastName", "Please enter valid last name").isLength({min: 1}),
  body("inputUsername", "Please fill enter valid username").isLength({min: 1}).custom(value => {
    return user_json.find({
      username: value
    }). then(user => {
      if (user.length > 0){
        return Promise.reject('Username already in use');
      }
    });
  }),
  body("inputEmail", "Please enter valid email").isLength({min: 1}).custom(value => {
    return user_json.find({
      email: value
    }). then(user => {
      if (user.length > 0){
        return Promise.reject('Email already in use');
      }
    });
  }),
  body("inputPassword", "Please fill enter valid password").isLength({min: 1}),
  body("inputPhone", "Please enter valid phone number").isLength({min: 1}),

async (req, res) => {
  const user_doc = {
    username: req.body.inputUsername,
    first_name: req.body.inputFirstName,
    last_name: req.body.inputLastName,
    password: req.body.inputPassword,
    email: req.body.inputEmail,
    phone_number: req.body.inputPhone,
  };

  const result= validationResult(req);
  var errors = result.errors;

  if (errors.length !== 0) {
    res.render('create', {errors: errors[0].msg})

  } else {

    // insert the data into the database
    const db_info = await user_json.create(user_doc);

    res.redirect('/');
}

});*/

router.get('/message', function (req, res) {
  res.render('message', {
    isAuthenticated: true,
    title: "Message"
  });
});
router.get('/nav', function (req, res) {
  if (user) {
    var isAuthenticated = req.isAuthenticated();
    res.render('nav', {
      isAuthenticated: isAuthenticated
    });
  } else {
    res.render('nav');
  }
});
router.post('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
});
router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect('/home/signin');
  });
});

var auth = function auth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json("not authenticated!");
};

router.get('/profile', auth, function (req, res) {
  res.render('profile', {
    isAuthenticated: true,
    title: "User Profile",
    lastname: req.user.first_name
  });
  console.log(req.user);
  console.log(req.session.passport.id);
});
router.post('/profile', function _callee(req, res) {
  var _user, fname, lname;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(user_json.findOne(user_doc));

        case 3:
          _user = _context.sent;
          fname = _user.first_name;
          lname = _user.last_name;
          res.render('profile', {
            isAuthenticated: true,
            firstName: fname,
            lastName: lname
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.render('profile', {
            errors: 'An error occured'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;
router.get('/feed', auth, function (req, res) {
  res.render('feed', {
    isAuthenticated: true,
    title: "Timeline"
  });
  console.log(req.user._id);
});
router.get('/groups', auth, function (req, res) {
  res.render('groups', {
    isAuthenticated: true,
    title: "Groups"
  });
});