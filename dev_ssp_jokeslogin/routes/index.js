
var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  if(!req.session.hasOwnProperty('passWord')){
    req.session.passWord = 'simonstan';
  }
  res.render('login');
});

router.post('/login', function(req,res,next){
  var username = req.body.uName;
  var password = req.body.pWord;
  
  if(username.length == 0 || password.length == 0 || password != req.session.password){
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
})
module.exports = router;
