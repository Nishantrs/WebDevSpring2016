/**
 * Created by NishantRatnakar on 3/20/2016.
 */

var q = require("q");

"use strict";

module.exports = function (db, mongoose, UserSchema) {

    var User = mongoose.model("UserModel", UserSchema);

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
        console.log(".....................................................");
        console.log("In Model createUser");

        newUser.roles = ["user"];
        newUser.bio = "";
        newUser.city = "";
        newUser.state = "";
        newUser.created = new Date();
        newUser.follower = [];
        newUser.following = [];
        newUser.votedFor = [];
        newUser.reviewedFor = [];
        newUser.restaurant = [];


        var deferred = q.defer();

        console.log(".....................................................");
        console.log("In Model createUser....after adding parameters");
        console.log(newUser);

        User.create(newUser, function(err, doc){
            if (err)
            {
                console.log(".....................................................");
                console.log("In Model createUser....unsuccessful creation of user");
                deferred.reject (err);
            }
            else
            {
                console.log(".....................................................");
                console.log("In Model createUser....successful creation of user");
                console.log(doc);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function getAllUsers()
    {
        console.log(".....................................................");
        console.log("In Model getAllUsers");

        var deferred = q.defer();

        User.find({},function(err, users)
        {
            if(!err)
            {
                console.log(".....................................................");
                console.log("In Model getAllUsers....successful");
                deferred.resolve(users);
            }
            else
            {
                console.log(".....................................................");
                console.log("In Model getAllUsers.....unsuccessful");
                deferred.reject(err);
            }
        });

        return deferred.promise;

    }

    function findUserById(userId)
    {
        var deferred = q.defer();

        //console.log(".....................................................");
        //console.log("In Model findUserById");

        User
            .findOne({_id: userId}, //findById(userId,...
                function(err, user)
                {
                    if (err)
                    {
                        console.log(".....................................................");
                        console.log("In Model findUserById......unsuccessful");
                        deferred.reject (err);
                    }
                    else
                    {
                        //console.log(".....................................................");
                        //console.log("In Model findUserById.......successful");
                        //console.log(user);
                        deferred.resolve (user);
                    }
                });

        return deferred.promise;
    }

    function findUserByUsername(username)
    {

        var deferred = q.defer();

        console.log(".....................................................");
        console.log("In Model findUserByUsername");

        User
            .findOne({username: username},
                function(err, user)
                {
                    if (err)
                    {
                        console.log(".....................................................");
                        console.log("In Model findUserByUsername.......unsuccessful");
                        deferred.reject (err);
                    }
                    else
                    {
                        console.log(".....................................................");
                        console.log("In Model findUserByUsername.......successful");
                        console.log(user);
                        deferred.resolve (user);
                    }
                });

        return deferred.promise;
    }

    //function findUserByCredentials(userName, userPassword)
    function findUserByCredentials(user)
    {
        var deferred = q.defer();

        //console.log(".....................................................");
        //console.log("In Model findUserByCredential");
        User
            .findOne({username: user.username, password: user.password},
            //.findOne({$and: [{username: userName},{password: userPassword}]},
                function(err, user)
                {
                    if (err)
                    {
                        console.log(".....................................................");
                        console.log("In Model findUserByCredential.....unsuccessful to contact database");
                        deferred.reject (err);
                    }
                    else
                    {
                        //console.log(".....................................................");
                        //console.log("In Model findUserByCredential.....successful");
                        //console.log(user);
                        deferred.resolve (user);
                    }
                });

        return deferred.promise;
    }




    function updateUserById(userId, user)
    {

        var deferred = q.defer();

        console.log(".....................................................");
        console.log("In Model updateUserById");

        User
            .findByIdAndUpdate(userId,
            {$set:{
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                city:user.city,
                state:user.state,
                bio:user.bio,
                password:user.password,
                votedFor:user.votedFor,
                reviewedFor:user.reviewedFor,
                followers:user.followers,
                following:user.following,
                roles:user.roles,
                restaurant:user.restaurant}}, //newly added
            function(err , stats)
            {
                if(stats)
                {
                    console.log(".....................................................");
                    console.log("In Model updateUserById.....update successful");

                    User
                        .findById(userId,
                        function(err , user){
                            if (err)
                            {
                                console.log(".....................................................");
                                console.log("In Model updateUserById.....cannot find user after update");
                                deferred.reject (err);
                            }
                            else
                            {
                                console.log(".....................................................");
                                console.log("In Model updateUserById.....user after update");
                                console.log(user);
                                deferred.resolve(user);
                            }

                    });
                }
                else
                {
                    console.log(".....................................................");
                    console.log("In Model updateUserById.....update unsuccessful");
                    deferred.reject(err);
                }
            });

        return deferred.promise;
    }


    function deleteUserById(userId)
    {
        var deferred = q.defer();

        console.log(".....................................................");
        console.log("In Model deleteUserById");

        User
            .remove({_id: userId},
                function(err, stats)
                {
                    if (err)
                    {
                        console.log(".....................................................");
                        console.log("In Model deleteUserById.......delete unsuccessful");
                        deferred.reject (err);
                    }
                    else
                    {
                        console.log(".....................................................");
                        console.log("In Model deleteUserById.......delete successful");
                        deferred.resolve (stats);
                    }
                }
            );

        return deferred.promise;
    }

    function addFollower(userId,follower){

        //console.log(".....................................................");
        //console.log("In Model addFollower");

        var deferred = q.defer();

        User
            .find({_id:userId},function(err , doc) {

                if (err)
                {
                    console.log(".....................................................");
                    console.log("In Model addFollower.....Cannot find user to be followed");
                    deferred.reject(err);
                }
                else
                {

                var local_follower = {
                    userId: follower.userId,
                    username: follower.username
                };
                doc = doc[0];
                doc.followers.push(local_follower);
                doc.save(function (err, result) {

                    if(result)
                    {
                        //console.log(".....................................................");
                        //console.log("In Model addFollower....after adding follower");
                        //console.log(result);

                        /* now adding to the follower/currentUser's data i.e. to his following */

                        User
                            .find({_id: follower.userId}, function (err, doc) {

                                if (err)
                                {
                                    console.log(".....................................................");
                                    console.log("In Model addFollower.....Cannot find following/current user");
                                    deferred.reject(err);
                                }
                                else
                                {

                                doc = doc[0];
                                var local_following = {
                                    userId: userId,
                                    username: follower.following //careful here with follower data creation as follower is currentUser
                                };

                                doc.following.push(local_following);
                                doc.save(function (err, result) {

                                    if (err) {
                                        console.log(".....................................................");
                                        console.log("In Model addFollower.....Cannot save following in currentUser");
                                        deferred.reject(err);
                                    }
                                    else
                                    {
                                    //console.log(".....................................................");
                                    //console.log("In Model addFollower....after adding the following");
                                    //console.log(result);

                                    User
                                        .find({_id: userId}, function (err, user) {
                                            if(err)
                                            {
                                                console.log(".....................................................");
                                                console.log("In Model addFollower.....Cannot find the user currentUser Followed");
                                                deferred.reject(err);
                                            }
                                            else
                                            {
                                                //console.log(".....................................................");
                                                //console.log("In Model addFollower.....returning updated user Followed who was just followed");
                                                //console.log(user);
                                                deferred.resolve(user);
                                            }
                                        })
                                    }

                                });
                                }

                            });
                    }
                    else
                    {
                        console.log(".....................................................");
                        console.log("In Model addFollower.....Cannot add/save follower");
                        deferred.reject(err);
                    }
                });
            }
        });
        return deferred.promise;


    }

};
