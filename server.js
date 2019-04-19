const express = require('express');
const logger = require('morgan');
const movies = require('./routes/movies');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');


var jwt = require('jsonwebtoken');
const app = express();

app.set('secretKey','ngopiDong');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

app.get('/', function(req, res){
    res.json({"tutorial" : "Build Rest API"});
});

//public route 
app.use('/users',users);

//private route with jwt
app.use('/movies',validateUser, movies);

app.get('/favicon.ico', function(req, res){
    res.sendStatus(204);
});

function validateUser(req, res, next){
    jwt.verify(req.headers['x-access-token'],
    req.app.get('secretKey'), function(err, decoded) {
        if(err){
            res.json({status:"error", message: err.message, data:null});
        }else{
            //add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });
}

app.use(function(req, res, next){
    let err = new Error('Not Found');
    err.status=404;
    next(err);
});

app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});

app.listen(3000, function() {console.log('server listening on port 3000');});