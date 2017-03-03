var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var admin = require('./routes/admin');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', index);

var loggedIn = function(req,res,next){
  if(!req.session.username){
    res.redirect('/login');
  }
  else{
    next();
  }
};

var jokesSetup = function (req,res,next){
  if(!req.session.allJoked){
    req.session.allJokes = new Array();
  }
  if(req.session.jokeCounter){
    req.session.jokeCounter = 0;
  }
  nest();
};

app.use(jokesSetup);
app.use(loggedIn);
app.use('/admin',loggedIn);
app.use('/admin', admin);
//app.use('/', routes);

var expressSession={
  secret:'aSecret',
  resave: false,
  saveUninitialized: false
};

app.use(session(expressSession));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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