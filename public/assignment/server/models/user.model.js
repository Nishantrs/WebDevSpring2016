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
        users.push(user);
        return users;
    }

    function getAllUsers()
    {
        return users;
    }

    function findUserById(userId)
    {
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
        var userFound = null;

        var username = userName;
        var password = userPassword;

        for (var i = 0; users.length; i++)
        {
            if (users[i].username === username && users[i].password === password)
            {
                userFound = users[i];
                break;
            }
        }
        return userFound;
    }

    function updateUserById(userId, user)
    {
        for (var i = 0; users.length; i++)
        {
            if (users[i]._id === userId)
            {
                users[i] = user;
                break;
            }
        }
        return users;
    }

    function deleteUserById(userId)
    {
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
