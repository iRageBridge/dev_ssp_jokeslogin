
var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req,res,next){
  var username = req.body.uName;
  var password = req.body.pWord;
  if(username.length == 0 || password.length == 0 || password != 'simonstan'){
    res.redirect('/login');
  }
  else{
    //req.session.uName = username;
    //req.session.pWord = password;
    res.redirect('/');
  }
});

router.get('/', function(req,res,next){
  res.render('index')
});

router.post('/', function(req, res, next){
  var joke = {
    joke: req.body.joke,
    author: 'simon',
    data: Date()
  };
  if(!req.session.hasOwnProperty('jokeTest')){
    req.session.jokeTest = [];
  }
  else{
    req.session.jokeTest.push(joke);
    res.redirect('/');
  }
});
module.exports = router;
