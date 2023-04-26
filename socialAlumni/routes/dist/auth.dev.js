"use strict";

var express = require('express');

var jwt = require('jsonwebtoken');

var passport = require('passport'); //var crypto = require('crypto');
//const LocalStrategy = require("passport-local");


var secretkey = "secret";

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var User = require('../models/user');

var alumni_json = require('../models/alumni_schema');

var router = express.Router();
router.post('/create', function _callee(req, res) {
  var user, errors;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = new User({
            first_name: req.body.inputFirstName,
            last_name: req.body.inputLastName,
            email: req.body.email,
            username: req.body.email,
            phone_number: req.body.inputPhone
          });
          _context.next = 4;
          return regeneratorRuntime.awrap(User.register(user, req.body.password));

        case 4:
          return _context.abrupt("return", res.redirect('/home/signin'));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          errors = _context.t0;

          if (errors.length !== 0) {
            res.render('create', {
              errors: errors.message
            });
          } else {
            res.render('create', {
              errors: "An error occured"
            });
          }

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/create', function (req, res) {
  res.render('create', {
    title: 'Create Account'
  });
});
router.get('/signin', function (req, res) {
  if (req.isAuthenticated()) {
    /* If request is already authenticated, 
    i.e. user has already logged in and 
    there is no need to login again. */
    console.log("SIGNED IN");
  } else {
    res.render('signin', {
      title: 'Sign In'
    });
    console.log("NOTE SIGNED IN ");
  }
});
/*router.post('/signin', function (req, res) {
  if (!req.body.email) {
    res.json({ success: false, message: 'Username was not given' })
  } else if (!req.body.password) {
    res.json({ success: false, message: 'Password was not given' })
  } else {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        res.json({ success: false, message: err })
      } else {
        if (!user) {
          res.json({
            success: false,
            message: 'username or password incorrect'
          })
        } else {
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            secretkey,
            { expiresIn: '24h' }
          )
          /*res.json({
            success: true,
            message: 'Authentication successful',
            token: token
          });
          res.redirect('/home/profile')
        }
      }
    })(req, res)
  }
}) */

router.post('/signin', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.render('signin', {
        errors: "Incorrect Username or Password"
      });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/home/profile');
    });
  })(req, res, next);
});
module.exports = router;