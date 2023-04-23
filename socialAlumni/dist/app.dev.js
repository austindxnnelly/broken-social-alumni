"use strict";

var dotenv = require('dotenv');

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var passport = require('passport');

var session = require('express-session');

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser'); //var logger = require('morgan');


var indexRouter = require('./routes/index');

var authRouter = require('./routes/auth'); //const student = require('./models/student_schema');
//const client = require('./models/user_schema');
//const alumni = require('./models/alumni_schema');

/* load .env*/


dotenv.config(); // Database

var mongoose = require("mongoose");

var user = process.env.ATLAS_USER;
var password = process.env.ATLAS_PASSWORD;
var db_url = "mongodb+srv://".concat(user, ":").concat(password, "@cluster0.hei7umz.mongodb.net/?retryWrites=true&w=majority");
var options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};
mongoose.connect(db_url, options).then(function () {
  console.log('successfully connected!');
})["catch"](function (e) {
  console.error(e, 'could not connect!');
});
var app = express(); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
  extended: true
})); //app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); //app.use(cookieParser());

app.use(express["static"](path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.redirect('/home/');
});
app.use('/home/', indexRouter);
app.use('/home/', authRouter);
app.use(bodyParser.json());

var UserM = require('./models/user');

passport.use(UserM.createStrategy());
passport.serializeUser(UserM.serializeUser());
passport.deserializeUser(UserM.deserializeUser()); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
var PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log("Server is live http://localhost:".concat(PORT));
});
module.exports = app;