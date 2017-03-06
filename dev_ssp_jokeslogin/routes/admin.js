var express = require('express');
var router = express.Router();

var getJokeIndex = function(allJokes,jokeID){
    var jokeIndex = -1;
    for(var i=0; i < allJokes.length; i++){
        if(allJokes[i].id == jokeID){
            jokeIndex = i;
        }
    }
    return jokeIndex;
};

router.get('/createJoke',function(req,res,next){
    res.render('jokeForm');
});

router.post('/newJoke', function(req,res,next){
    var joke = {};
    joke.id = req.session.jokeCounter++;
    joke.date = new Date();
    joke.joke = req.body.theJoke;
    joke.image = req.body.jokeImage;
    req.session.allJokes.push(joke);
    res.redirect('/');
});

router.get('/delete/:id', function(req,res,next){
    if(req.params.id){
        var jokeIndex = getJokeIndex(req.session.allJokes, req.params.id);
        if(jokeIndex != -1){
            req.session.allJokes.splice(jokeIndex,1);
        }
    }
    res.redirect('/');
});

module.exports = router;