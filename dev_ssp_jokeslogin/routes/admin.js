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
    res.render('index');
});

router.post('/newJoke', function(req,res,next){
    var joke = {};
    joke.id = req.session.jokeCounter++;
    joke.date = Date();
    joke.joke = req.body.theJoke;
    req.session.allJokes.push(joke);
    res.redirect('/');
});

router.get('/delete/:id', function(req,res,next){
    if(req.params.id){
        var jokeIndex = getJokeIndex(req.session.allJokes,req.query.id);
        if(jokeIndex != -1){
            res.render('index',{
                joke:req.session.allJokes[jokeIndex]
            });
        }
        else{
            res.redirect('/');
        }
    }
});

router.post('.editJoke', function(req,res,next){
    var jokeID = req.body.id;
    var jokeIndex = getJokeIndex(req.session.allJokes, req.body.id);
    if(jokeIndex != -1){
        req.session.allJoked[jokeIndex].joke = req.body.theJoke;
    }
    res.redirect('/');
});

module.exports = router;