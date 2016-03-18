/**
 * Created by NishantRatnakar on 3/17/2016.
 */

var uuid = require('node-uuid');

module.exports = function(app, userModel)
{

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    //app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
    app.get("/api/assignment/user/:username/:password",findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);



    function createUser(req, res)
    {
        console.log("In server services create");
        var newUser = req.body;

        newUser._id = uuid.v1(); //time based id created.

        //userModel
        //    .createUser(newUser)
        //    .then(function (users)
        //            {
        //        res.json(users);
        //            })

        res.json(userModel.createUser(newUser));
    }

    function getAllUsers(req, res)
    {
        //userModel
        //    .getAllUsers()
        //    .then(function(users)
        //            {
        //                res.json(users);
        //            })

        console.log("In server services getAllUsers");
        res.json(userModel.getAllUsers());
    }

    function findUserById(req, res)
    {
        var userId = req.params.id;

        //userModel
        //    .findUserById(userId)
        //    .then(function(user)
        //            {
        //                res.json(user);
        //            })

        res.json(userModel.findUserById(userId));
    }

    function findUserByUsername(req, res)
    {
        var userName = req.params.username;

        //userModel
        //    .findUserByUsername(userName)
        //    .then(function(user)
        //            {
        //                res.json(user);
        //            })

        res.json(userModel.findUserByUsername(userName));
    }

    function findUserByCredentials(req, res)
    {
        //var userName = req.query.username;
        //var userPassword = req.query.password;

        var userName = req.params.username;
        var userPassword = req.params.password;

        console.log(userName);
        console.log(userPassword);

        //userModel
        //    .findUserByCredentials(userName, userPassword)
        //    .then(function(user)
        //            {
        //                res.json(user);
        //            })

        console.log("In server services credential");

        res.json(userModel.findUserByCredentials(userName, userPassword));
    }

    function updateUserById(req, res)
    {

        console.log("In services update");
        var userId = req.params.id;
        var userObj = req.body;

        console.log(userId);
        console.log(userObj);

        //userModel
        //    .updateUserById(userId, userObj)
        //    .then(function(users)
        //    {
        //        res.json(users);
        //    });

        res.json(userModel.updateUserById(userId, userObj));

    }

    function deleteUserById(req, res)
    {
        var userId = req.params.id;

        //userModel
        //    .deleteUserById(userId)
        //    .then(function(users)
        //    {
        //        res.json(users);
        //    });

        res.json(userModel.deleteUserById(userId));
    }


};