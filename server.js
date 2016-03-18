var express = require('express');
var app = express();

//required for understanding json data in response and request.
var bodyParser = require('body-parser');
//form related data
var multer = require('multer');




app.use(express.static(__dirname + '/public'));

// addition for json data transfer with server.
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer());

// For assignment3 only
require('./public/assignment/server/app.js')(app);

//for generationg random id
var uuid = require('node-uuid');


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world!!!!');
});
app.listen(port, ipaddress);