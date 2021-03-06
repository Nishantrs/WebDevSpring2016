/**
 * Created by NishantRatnakar on 3/16/2016.
 */

"use strict";

var q = require("q");

module.exports = function (db, mongoose) {

    //loading user schema for document structure validation against schema
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var User = mongoose.model("User", UserSchema);


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


        var deferred = q.defer();

        //console.log("In Model createUser");

        User.create(user, function(err, doc){
            if (err)
            {
                deferred.reject (err);
            }
            else
            {
                //console.log(doc);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }


    function getAllUsers()
    {
        var deferred = q.defer();

        //console.log("In Model getAllUsers");

        User.find({},function(err, users)
        {
            if(!err)
            {
                deferred.resolve(users);
            }
            else
            {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }


    function findUserById(userId)
    {
        var deferred = q.defer();

        //console.log("In Model findUserById");

        User
            .findOne({_id: userId}, //findById(userId,...
            function(err, user)
            {
                if (err)
                {
                    deferred.reject (err);
                }
                else
                {
                    deferred.resolve (user);
                }
            });

        return deferred.promise;
    }

    function findUserByUsername(username)
    {

        var deferred = q.defer();

        //console.log("In Model findUserByUsername");

        User
            .findOne({username: username},
                function(err, user)
                {
                    if (err)
                    {
                        deferred.reject (err);
                    }
                    else
                    {
                        //console.log(user);
                        deferred.resolve (user);
                    }
                });

        return deferred.promise;
    }

    function findUserByCredentials(user)  //(userName, userPassword)
    {
        //var deferred = q.defer();
        //
        //console.log("In Model findUserByCredential");
        //User
        //    .findOne({$and: [{username: userName},{password: userPassword}]},
        //        function(err, user)
        //        {
        //            if (err)
        //            {
        //                deferred.reject (err);
        //            }
        //            else
        //            {
        //                deferred.resolve (user);
        //            }
        //        });
        //
        //return deferred.promise;

        var deferred = q.defer();

        //console.log("In Model findUserByCredential");
        User
            .findOne({username: user.username, password: user.password},
                function(err, user)
                {
                    if (err)
                    {
                        deferred.reject (err);
                    }
                    else
                    {
                        deferred.resolve (user);
                    }
                });

        return deferred.promise;
    }

    function updateUserById(userId, user)
    {
        var deferred = q.defer();

        //console.log("In Model updateUserById");

        //might use findAndModify(query,[['_id',1]],payload,{new:true},function(err,result) {} as profile controller expecting a user.
        //can same deferred be used twice for reject and resolve???


        User
            .update({_id:userId},
                    //{
                    //    username:user.username,
                    //    password:user.password,
                    //    firstName:user.firstName,
                    //    lastName:user.lastName,
                    //    emails:user.emails,
                    //    roles:user.roles
                    //},
                    {$set: user},
                    function(err,stats)
                    {
                        if(stats)
                        {
                        User.findById(userId,
                            function(err , user)
                            {
                                if (err)
                                {
                                    deferred.reject (err);
                                }
                                else
                                {
                                    //console.log('after update');
                                    //console.log(user);
                                    deferred.resolve(user);
                                }
                            });
                        }
                        else
                        {
                            deferred.reject(err);
                        }
                    });

        return deferred.promise;

    }

    function deleteUserById(userId)
    {

        var deferred = q.defer();

        //console.log(".........................");
        //console.log("In Model deleteUserById");

        User
            .remove({_id: userId},
                function(err, stats)
                {
                    if (err)
                    {
                        deferred.reject (err);
                    }
                    else
                    {
                        //console.log(".........................");
                        //console.log("Successfully deleted!!!");
                        deferred.resolve (stats);
                    }
                }
            );

        return deferred.promise;
    }
};

