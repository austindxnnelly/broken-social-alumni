var express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
//var crypto = require('crypto');
//const LocalStrategy = require("passport-local");
const secretkey = "secret";

const { body, validationResult } = require('express-validator')

const User = require('../models/user')
const alumni_json = require('../models/alumni_schema')

const router = express.Router()

router.post('/create', async (req, res) => {
  try {
    const user = new User({
      first_name: req.body.inputFirstName,
      last_name: req.body.inputLastName,
      email: req.body.email,
      username: req.body.email,
      phone_number: req.body.inputPhone
    })
    await User.register(user, req.body.password)
    req.login(user, function (err) {
      if (err) {
        res.json({ success: false, message: err })
      }
      return res.redirect('/home/')
    })
  } catch (error) {
    
    var errors = error;
    if (errors.length !== 0) {
        res.render('create', {errors: errors.message})
      } else {
        res.render('create', {errors: "An error occured"})
      }
  }
})

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create Account' })
})

router.get('/signin', (req, res) => {
  if (req.isAuthenticated()) {
  
    /* If request is already authenticated, 
    i.e. user has already logged in and 
    there is no need to login again. */
    console.log("SIGNED IN");
}
else {
  res.render('signin', { title: 'Sign In' })
  console.log("NOTE SIGNED IN ")
}
})

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
router.post ('/signin', function(req, res, next) {
  passport.authenticate( 'local', function(err, user) {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.render('signin', {errors: "Incorrect Username or Password"})
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/home/profile');
    });
  })(req, res, next);
});

module.exports = router
