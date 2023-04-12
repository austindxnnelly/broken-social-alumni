var express = require('express');
const { req } = require('express');
const { body, validationResult } = require('express-validator');


const user_json = require('../models/user_schema');
const alumni_json = require('../models/alumni_schema');


const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Social Alumni' });
});

router.get('/signin', (req, res) => {
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
          res.render('index', {isAuthenticated: true})
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

});




router.get('/message', (req, res) => {
  res.render('message', {title: "Message"});
});

router.get('/nav', (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  res.render('nav', { isAuthenticated });
});


module.exports = router;
