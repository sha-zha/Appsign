const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const cookieSession = require('cookie-session')
const dotenv = require('dotenv').config();

/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
const configDB = require('./config/database.js');

// mongoose.connect(configDB.url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// }).then(() => {
//   console.log('connection established successfully')
// }).catch(); {
// };
/***********************************/


//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var templatesRouter = require('./routes/templates');

var app = express();

//
app.use(
  cookieSession({
    name: 'simplon-signin-app',
    keys: ['vfK8neVxqr'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
)

/**
 * @MiddleWare
 * Identifier l'utilisateur connecté (email - userID)
 */
app.use('/*', function (req, res, next) {
  // console.log(req.session)
  res.locals.currentUser = {}
  if (req.session.user) {
    res.locals.currentUser.login = req.session.user.email
    res.locals.currentUser.id = req.session.user._id
  }
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
/**
 * @MiddleWare
 * Message flash error success
 */
app.use(function(req, res, next) {
  res.locals.msgFlash = req.flash("success")
  res.locals.msgFlashError = req.flash("error")
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/templates', templatesRouter);

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

module.exports = app;
