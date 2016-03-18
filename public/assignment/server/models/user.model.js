/**
 * Created by NishantRatnakar on 3/16/2016.
 */

"use strict";

var users = require('./user.mock.json');

module.exports = function (app) {

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

    function createUser(user)
    {
        console.log("In Model createUser");

        users.push(user);
        return user;
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
        for (var i = 0; users.length; i++)
        {
            if (users[i]._id === userId)
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

        var userFound = null;

        for (var i = 0; users.length; i++)
        {
            if (users[i].username === username)
            {
                userFound = users[i];
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

        for (var i in users)  //var i = 0; users.length; i++
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
