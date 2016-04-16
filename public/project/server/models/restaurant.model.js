/**
 * Created by NishantRatnakar on 4/7/2016.
 */


//follow restaurant,,,,requires user model.

var q = require("q");

"use strict";


module.exports = function (db, mongoose, RestaurantSchema) {

    var Review = mongoose.model("RestaurantModel", RestaurantSchema);

    var api =
    {
        createUser: createUser,
        getAllUsers: getAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById,
        addFollower: addFollower
    };
    return api;


    function createUser(newUser)
    {

    }

    function getAllUsers()
    {

    }

    function findUserById(userId)
    {

    }

    function findUserByUsername(username)
    {

    }

    function findUserByCredentials(userName, userPassword)
    {

    }




    function updateUserById(userId, user)
    {

    }


    function deleteUserById(userId)
    {

    }

    function addFollower(userId,follower)
    {

    }

};
