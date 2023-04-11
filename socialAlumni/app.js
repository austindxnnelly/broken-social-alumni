const dotenv = require('dotenv');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//const student = require('./models/student_schema');
//const client = require('./models/user_schema');
//const alumni = require('./models/alumni_schema');

/* load .env*/
dotenv.config();

// Database
const mongoose = require("mongoose");
const user = process.env.ATLAS_USER;
const password = process.env.ATLAS_PASSWORD;
const db_url = `mongodb+srv://${user}:${password}@cluster0.hei7umz.mongodb.net/?retryWrites=true&w=majority`
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}


mongoose.connect(db_url, options).then(() => {
  console.log('successfully connected!')
}).catch((e) => {
  console.error(e, 'could not connect!')
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
  res.redirect('/home/')
})
app.use('/home/', indexRouter);
app.use('/users', usersRouter);
//app.use()

/*let id;

const c = new user_json ({
  password: '111',
  first_name: 'Tara',
  last_name: 'Glennie',
  email: 'taraglennie@hotmail.com',
  phone_number: Number('0221705979')
}
);


c.save();

id = c.id;
console.log(id);*/

/*const a = new alumni ({
  user: id,
  degree: 'csci',
  current_job: 'network',
  year_graduated: '2023'
});

a.save();*/

/*const stud = new student ({
  first_name: 'Tara',
  last_name: 'Glennie',
});

stud.save();*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is live http://localhost:${PORT}`);
});

module.exports = app;


