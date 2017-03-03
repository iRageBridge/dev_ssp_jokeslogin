
var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req,res,next){
  var username = req.body.uName;
  var password = req.body.pWord;
  if(username.length == 0 || password.length == 0 || password != 'simonstan'){
    //req.session.userMessage = "Wrong/No Password";
    res.redirect('/login');
  }
  else{
    //req.session.uName = username;
    //req.session.pWord = password;
    res.redirect('/');
  }
});

router.get('/', function(req,res,next){
  res.render('index',{
    jokes: req.session.allJokes
  });
});
  /*
  if (!req.session.hasOwnProperty('jokeTest')) {
    req.session.jokeTest = [];
    res.render('index',{
      title: 'Jokes',
      jokesArray: req.session.jokeTest
    });
  }
});

router.post('/', function(req, res, next){
  var joke = {};
    joke.joke = req.body.joke;
    joke.author = 'Simon';
    joke.date = Date();
  if(req.session.jokeTest){
    req.session.jokeTest.push(joke);
    res.redirect('/');
  }
});*/
module.exports = router;
