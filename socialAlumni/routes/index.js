var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Social Alumni' });
});

router.get('/signIn', function(req, res) {
  res.render('sign-in', {title: 'Sign In' });
});

router.get('/create', (req, res) => {
  res.render('create', {title: "Create Account"});
});

router.get('/nav', (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  res.render('nav', { isAuthenticated });
});


module.exports = router;
