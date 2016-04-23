/**
 * Created by NishantRatnakar on 3/20/2016.
 */

//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel)
{

    //var auth = authorized;
    //var admin = isAdmin;

    //app.post("/api/project/login", passport.authenticate('local'), login); //newly added to differentiate admin functionality

    app.post("/api/project/user", createUser);

    app.put("/api/project/user/:id", updateUserById);
    //app.put("/api/project/user/:id", auth,updateUserById);

    app.delete("/api/project/admin/:id", deleteUserById);
    //app.delete("/api/project/admin/:id", admin, deleteUserById);

    app.get("/api/project/user", decideEndpoint);

    app.put('/api/project/user',addFollower);

    app.get("/api/project/loggedin", loggedIn);

    app.put("/api/project/unfollow", removeFollower);

    app.post("/api/project/logout", logout);

    app.put("/api/project/admin/user/:id", editUser);
    //app.put("/api/project/admin/user/:id", admin, editUser);


    //passport.use(new LocalStrategy(localStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

    //function localStrategy(username, password, done)
    //{
    //    console.log(".........................");
    //    console.log("In server services localStrategy Project");
    //
    //    userModel
    //    .findUserByCredentials({username: username, password: password}) //username, password
    //        //.findUserByUsername(username)
    //        .then(function(user)
    //        {
    //            console.log(".........................");
    //            console.log("In server services localStrategy.....just before returning user");
    //
    //            //console.log(password);
    //            //console.log(user.password);
    //
    //            if(user)
    //            {
    //                console.log(".........................");
    //                console.log("In server services localStrategy.....before returning user");
    //                return done(null, user);
    //                //console.log(".........................");
    //                //console.log("In server services localStrategy.....after returning user");
    //            }
    //            else
    //            {
    //                console.log(".........................");
    //                console.log("In server services localStrategy.....failed to return user");
    //                return done(null, false);
    //            }
    //        },function(err)
    //        {
    //            if(err)
    //            {
    //                return done(err);
    //            }
    //        });
    //
    //}


    function decideEndpoint(req, res)
    {

        console.log(".....................................................");
        console.log("In server user services Deciding Endpoint...");

        if(req.query.username && req.query.password)
        {
            findUserByCredentials(req, res);
        }
        else if (req.query.username)
        {
            findUserByUsername(req, res);
        }
        else if (req.query.id)
        {
            findUserById(req, res);
        }
        else
        {
            getAllUsers(req, res);
        }
    }



    function createUser(req, res)
    {
        //console.log(".....................................................");
        //console.log("In server services createUser");

        var newUser = req.body;

        userModel
            .createUser (newUser)
            .then (
                function(user)
                {
                    req.session.currentUser = user;
                    res.json(user);

                    //req.login(user, function(err) {   //login is passport high-level function just like .isAuthenticated,.user,.logOut
                    //    if(err) {
                    //        res.status(400).send(err);
                    //    } else {
                    //        res.json(user);
                    //    }
                    //});
                },
                function(err)
                {
                    res.status(400).send(err);
                });

        //res.json(userModel.createUser(newUser));
    }

    function getAllUsers(req, res)
    {
        console.log(".....................................................");
        console.log("In server services getAllUsers");

        userModel
            .getAllUsers()
            .then (
                function(users)
                {
                    res.json(users);
                },
                function(err)
                {
                    res.status(400).send(err);
                });

        //res.json(userModel.getAllUsers());
    }

    function findUserById(req, res)
    {
        //console.log(".....................................................");
        //console.log("In server user services findUserById");

        var userId = req.query.id;

        //console.log(userId);

        userModel
            .findUserById(userId)
            .then(function(user)
                {
                    res.json(user);
                },
                function(err)
                {
                    res.status(400).send(err);
                });

    }


    function findUserByUsername(req, res)
    {
        //console.log(".....................................................");
        //console.log("In server user services findUserByUsername");

        var userName = req.query.username;

        userModel
            .findUserByUsername(userName)
            .then(function(user)
                {
                    res.json(user);
                },
                function(err)
                {
                    res.status(400).send(err);
                });

        //res.json(userModel.findUserByUsername(userName));
    }

    function findUserByCredentials(req, res)
    {

        //console.log(".....................................................");
        //console.log("In server user services findUserByCredentials");

        var userName = req.query.username;
        var userPassword = req.query.password;

        //console.log(userName);
        //console.log(userPassword);

        userModel
            .findUserByCredentials(userName, userPassword)
            .then(function(user)
                {
                    req.session.currentUser = user;
                    res.json(user);
                    //var user = req.user;
                    //res.json(user);
                },
                function(err)
                {
                    res.status(400).send(err);
                });
    }

    function updateUserById(req, res)
    {

        console.log(".....................................................");
        console.log("In server user services update user");

        var userId = req.params.id;
        var userObj = req.body;

        console.log(userId);
        console.log(userObj);

        //if(userId)
        //{
            console.log(".....................................................");
            console.log("In server user services updateUserById");

            userModel
                .updateUserById(userId, userObj)
                .then(function(user)
                    {
                        //console.log(".....................................................");
                        //console.log("In server user services updated user returned");
                        //console.log(user);
                        //req.session.currentUser = user;
                        res.json(user);
                    },
                    function(err)
                    {
                        res.status(400).send(err);
                    });

    }


    function editUser(req, res)
    {
        console.log("In server services editUser");

        var newUser = req.body;

        if(!newUser.roles || !newUser.roles.length > 0)
            newUser.roles = ["user"];


        console.log(newUser);
        console.log(req.params.id);

        //userModel
        //    .findUserByUsername(newUser.username)
        //    .then(function (user) {
        //            if (user == null)
        //            {
                        userModel
                            .updateUserById(req.params.id, newUser)
                            .then(
                                function (user) {
                                    res.json(user);
                                },
                                function (err) {
                                    res.status(400).send(err);
                                });
            //        }
            //        else
            //        {
            //            res.json(null);
            //        }
            //    },
            //    function (err) {
            //        res.status(400).send(err);
            //    }
            //);
    }

    function deleteUserById(req, res)
    {
        console.log(".....................................................");
        console.log("In server user services delete user");

        var userId = req.params.id;

        userModel
            .deleteUserById(userId)
            .then(function(stats)
                {
                    res.send(200);
                },
                function(err)
                {
                    res.status(400).send(err);
                });

        //res.json(userModel.deleteUserById(userId));
    }

    function addFollower(req,res)
    {
        console.log(".....................................................");
        console.log("In server user services addFollower");

        var userId = req.query.userId;
        var follower = req.body;
        //var follower = req.query.follower;

        //console.log(userId);
        //console.log(follower);

        userModel
            .addFollower(userId,follower)
            .then(function(user)
            {
                userModel
                    .findUserById(follower.userId)
                    .then(function(updatedCurrentUser)
                    {
                        req.session.currentUser = updatedCurrentUser;

                        res.json(user);

                    },function(err)
                    {
                        res.status(400).send(err);
                    });

            },function(err)
            {
                res.status(400).send(err);
            });
    }

    function removeFollower(req,res)
    {

        console.log(".....................................................");
        console.log("In server user services removeFollower");
        var userObj = req.body;

        //console.log(userId);
        console.log(userObj);

        userModel
            .updateUserById(userObj._id, userObj)
            .then(function(user)
                {
                    console.log(".....................................................");
                    console.log("In server user services updated displayUser returned");
                    console.log(user);
                    res.json(user);
                },
                function(err)
                {
                    res.status(400).send(err);
                });

    }

    //function logout(req,res)
    //{
    //    //console.log(".....................................................");
    //    //console.log("In User Services Server....logout");
    //    req.session.destroy();
    //    res.send(200);
    //}

    //function loggedIn(req, res)
    //{
    //    //console.log(".....................................................");
    //    //console.log("In User Services Server....loggedIn");
    //    res.json(req.session.currentUser);
    //
    //}


    function loggedIn(req, res)
    {
        console.log("In User Services Server....loggedin");

        res.json(req.session.currentUser);

        //res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res)
    {
        console.log("In User Services Server....logout");
        req.session.destroy();
        res.send(200);
        //req.logOut();
        //res.send(200);
    }

    //function isAdmin(req, res, next)
    //{
    //    console.log(".........................");
    //    console.log("In server services isAdmin");
    //    console.log(req.user.roles.indexOf("admin"));
    //
    //    if (req.isAuthenticated() && req.user.roles.indexOf("admin") != -1)
    //    {
    //        next();
    //    }
    //    else
    //    {
    //        res.send(403);
    //    }
    //}
    //
    //function authorized (req, res, next) {
    //    if (!req.isAuthenticated()) {
    //        res.send(401);
    //    } else {
    //        next();
    //    }
    //}
    //
    //function serializeUser(user, done)
    //{
    //    console.log("In User Services Server....serializeUser");
    //    done(null, user);
    //}
    //
    //function deserializeUser(user, done)
    //{
    //    console.log("In User Services Server....deserializeUser");
    //
    //    userModel
    //        .findUserById(user._id)
    //        .then(
    //            function(user){
    //                done(null, user);
    //            },
    //            function(err){
    //                done(err, null);
    //            }
    //        );
    //}
    //
    //function login(req,res)
    //{
    //    console.log(".............................");
    //    console.log("In User Services Server....login");
    //
    //    var user = req.user;
    //
    //    res.json(user);
    //}
};