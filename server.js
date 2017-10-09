var express = require('express');

// creating an express instance
var app = express();
//required for understanding json data in response and request.
var bodyParser = require('body-parser');
//form related data
var multer = require('multer');
//for passport
var passport = require('passport');
//used to parse cookie from the header of the request
var cookieParser = require('cookie-parser');
//for storing user details in session
var session = require('express-session');
//Database connection
var mongoose = require('mongoose');

// create a default connection string for local
var connectionString = 'mongodb://127.0.0.1:27017/cs5610Spring2016';

// use remote connection string
// if running in remote server

// Previously hosted on OpenShift
//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//        process.env.OPENSHIFT_APP_NAME;
//}


// Hosting on Heroku
console.log("MongoDB Username: "+ process.env.MLAB_USERNAME_WEBDEV);
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds113785.mlab.com:13785/heroku_mw668qsj'; // remote DB connection
}

// connect to the database
var db = mongoose.connect(connectionString);



app.use(express.static(__dirname + '/public'));

// addition for json data transfer with server.
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer());
multer();
app.use(session({secret: process.env.SECRET || "Hardcoded Value for now",
    saveUninitialized: true,
    resave: true})); //secret: "Hardcoded Value for now"
app.use(cookieParser());


//order matters
app.use(passport.initialize());
app.use(passport.session());



//for generating random id
var uuid = require('node-uuid');

// For assignment3 only
// db connection added for assignment 4
require('./public/assignment/server/app.js')(app, db, mongoose);


// For project only
require('./public/project/server/app.js')(app, db, mongoose);



var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world!!!!');
});
app.listen(port, function(){
    console.log("Server is listening to port: "+port);
});