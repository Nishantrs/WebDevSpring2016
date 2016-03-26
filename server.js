var express = require('express');
var app = express();

//required for understanding json data in response and request.
var bodyParser = require('body-parser');
//form related data
var multer = require('multer');


//used to parse cookie from the header of the request
var cookieParser = require('cookie-parser');

//for storing user details in session
var session = require('express-session');




app.use(express.static(__dirname + '/public'));

// addition for json data transfer with server.
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer());
app.use(session({secret: process.env.SECRET || "Hardcoded Value for now",
    saveUninitialized: true,
    resave: true})); //secret: "Hardcoded Value for now"
app.use(cookieParser());


//for generating random id
var uuid = require('node-uuid');

// For assignment3 only
require('./public/assignment/server/app.js')(app, uuid);


// For project only
require('./public/project/server/app.js')(app, uuid);



var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world!!!!');
});
app.listen(port, ipaddress);