/**
 * Created by NishantRatnakar on 3/13/2016.
 */


var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public2'));

var courses =
    [{title:"Java 101", seats: 23, start: new Date()},{title:"C# 101", seats: 23, start: new Date()},{title:"Node.js 101", seats: 23, start: new Date()}];

app.get('/rest/course/:id', function(req, res){
    var index = req.params["id"]; //req.params.id also allowed
    res.send(courses[index]);
});

app.get('/rest/course',function(req, res){
        res.send(courses);
});

app.get('/', function(req, res){
    res.send('hello world');//respond to root with hardcoded value.
});

app.listen(3000);