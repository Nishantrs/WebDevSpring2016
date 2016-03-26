/**
 * Created by NishantRatnakar on 3/20/2016.
 */

var q = require("q");

"use strict";

var users = require('./user.mock.json');

module.exports = function (app, uuid) {

    var api =
    {
        createUser: createUser,
        getAllUsers: getAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById
    };
    return api;

    //function createUser(newUser)
    //{
    //    console.log("In Model createUser");
    //
    //    newUser._id = uuid.v1(); //time based id created.
    //    newUser.roles = ["user"];
    //    newUser.bio = "";
    //    newUser.follower = [];
    //    newUser.following = [];
    //
    //    users.push(newUser);
    //    console.log(newUser);
    //    return newUser;
    //}


    function createUser(newUser)
    {
        console.log("In Model createUser");

        newUser._id = uuid.v1(); //time based id created.
        newUser.roles = ["user"];
        newUser.bio = "";
        newUser.follower = [];
        newUser.following = [];

        //once database connection is established
    //    var deferred = q.defer();
    //
    //    users.push(newUser, function (err, doc) {
    //        console.log (doc);
    //               if (err) {
    //                   console.log(err+" Inside createUser error");
    //                   deferred.reject (err);
    //                   } else {
    //                   console.log(doc+" Inside createUser doc");
    //                   deferred.resolve (doc);
    //                  }
    //});
    //    return deferred.promise;


        users.push(newUser);
        console.log(newUser);
        return newUser;
    }

    function getAllUsers()
    {
        console.log("In Model getAllUsers");

        return users;
    }

    function findUserById(userId)
    {
        console.log("In Model findUserById");

        var userFound = null;
        for (var i in users)
        {
            if (users[i]._id == userId)
            {
                userFound = users[i];
                break;
            }
        }
        return userFound;
    }

    function findUserByUsername(username)
    {
        console.log("In Model findUserByUsername");
        console.log(username);

        var userFound = null;
        //var userFound = false;

        for (var i in users)
        {
            console.log("In Model findUserByUsername In loop");
            if (users[i].username == username)
            {
                console.log("In Model findUserByUsername In if");
                userFound = users[i];
                //userFound = true;
                break;
            }
        }
        return userFound;
    }

    function findUserByCredentials(userName, userPassword)
    {
        console.log("In Model findUserByCredential");
        var userFound = null;

        var username = userName;
        var password = userPassword;

        for (var i in users) //var i = 0; users.length; i++ not working
        {
            if (users[i].username == username && users[i].password == password)
            {
                userFound = users[i];
                break;
            }
        }
        return userFound;
    }

    function updateUserById(userId, user)
    {
        console.log("In Model updateUserById");

        //console.log(users[1]._id);

        for (var i in users)
        {
            console.log("In Model In loop updateUserById");
            if (users[i]._id == userId)
            {
                console.log("In Model Inside if");
                users[i] = user;
                console.log(users[i]);
                return users[i];
            }
        }

    }

    function deleteUserById(userId)
    {
        console.log("In Model deleteUserById");
        for (var i = 0; users.length; i++)
        {
            if (users[i]._id === userId)
            {
                users.splice(i, 1);
                break;
            }
        }
        return users;
    }
};
