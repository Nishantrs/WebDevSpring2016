/**
 * Created by NishantRatnakar on 3/17/2016.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt      = require("bcrypt-nodejs");

module.exports = function(app, userModel)
{


    var auth = authorized;
    var admin = isAdmin;


    app.post("/api/assignment/login", passport.authenticate('local'), login); //newly added to differentiate admin functionality
    app.post("/api/assignment/admin/user", admin,createUser);
    app.put("/api/assignment/user/:id", auth, updateUserById);
    app.delete("/api/assignment/user/:id", admin, deleteUserById);//newly added auth
    app.get("/api/assignment/user", auth, decideEndpoint);  //newly added auth
    app.post("/api/assignment/user/logout", logout);
    app.get("/api/assignment/user/loggedin", loggedin);

    //newly added to differentiate admin functionality
    app.post  ('/api/assignment/register',       register);
    app.get("/api/assignment/admin/user", admin, getAllUsers);
    app.put("/api/assignment/admin/user/:id",admin, editUser);

    //passport.use(new LocalStrategy(localStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);
    //
    //
    //function localStrategy(username, password, done)
    //{
    //    console.log(".........................");
    //    console.log("In server services localStrategy");
    //
    //    userModel
    //        //.findUserByCredentials({username: username, password: password}) //username, password
    //        .findUserByUsername(username)
    //        .then(function(user)
    //        {
    //            console.log(".........................");
    //            console.log("In server services localStrategy.....just before returning user");
    //
    //            console.log(password);
    //            console.log(user.password);
    //            console.log(bcrypt.compareSync(password, user.password));
    //
    //            if(user && bcrypt.compareSync(password, user.password))
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
    //            {
    //                if(err)
    //                {
    //                    return done(err);
    //                }
    //            });
    //
    //}



    function decideEndpoint(req, res)
    {
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
        console.log("In server services create");

        var newUser = req.body;


        if(!newUser.roles || !newUser.roles.length > 0)
            newUser.roles = ["student"];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user == null)
                    {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser)
                            .then(
                                function (user) {
                                    return userModel.getAllUsers();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                    }
                    else
                    {
                        return userModel.getAllUsers();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            )

    }

    function getAllUsers(req, res)
    {
        console.log("In server services getAllUsers");
        //res.json(userModel.getAllUsers());

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

    }

    function findUserById(req, res)
    {
        var userId = req.query.id;
        console.log(userId);

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

        //res.json(userModel.findUserById(userId));
    }

    function findUserByUsername(req, res)
    {
        var userName = req.query.username;
        console.log(userName);

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
        //var userName = req.query.username;
        //var userPassword = req.query.password;
        //
        //console.log(userName);
        //console.log(userPassword);
        //
        //userModel
        //    .findUserByCredentials(userName, userPassword)
        //    .then(function(user)
        //            {
        //                req.session.currentUser = user;   //login
        //                res.json(user);
        //            },
        //        function(err)
        //            {
        //                res.status(400).send(err);
        //            });
        //
        //console.log("In server services credential");

        //res.json(userModel.findUserByCredentials(userName, userPassword));
    }

    function updateUserById(req, res)
    {

        //console.log("In services update");
        var userId = req.params.id;
        var userObj = req.body;

        //console.log(userId);
        //console.log(userObj);


        userModel
            .updateUserById(userId, userObj)
            .then(function(user)
            {
                //req.session.currentUser = user;
                //res.send(200);
                res.json(user);
            },
                function(err)
                {
                    res.status(400).send(err);
                });

        //res.json(userModel.updateUserById(userId, userObj));

    }

    function editUser(req, res)
    {
        console.log("In server services editUser");

        var newUser = req.body;

        if(!newUser.roles || !newUser.roles.length > 0)
            newUser.roles = ["student"];


        console.log(newUser);
        console.log(req.params.id);

        userModel
            .updateUserById(req.params.id, newUser)
            .then(
                function (user) {
                    return userModel.getAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res)
    {

        console.log(".........................");
        console.log("In server services deleteUserById");

        userModel
            .deleteUserById(req.params.id)
            .then(function(stats)
                {
                    console.log(".........................");
                    console.log("Returns to find all remaining user....Successfully delete");
                    return userModel.getAllUsers();
                },
                function(err){
                    console.log(".........................");
                    console.log("Error after delete");
                    res.status(400).send(err);
                })
            .then(function(users)
                {
                    console.log(".........................");
                    console.log("Returns all remaining user");
                    res.json(users);
                }, function(err)
                {
                    console.log(".........................");
                    console.log("Error after finding all users");
                    res.status(400).send(err);
                });

        //res.json(userModel.deleteUserById(userId));
    }

    //New added functions
    //
    function login(req,res)
    {
        console.log(".............................");
        console.log("In User Services Server....login");

        var user = req.user;

        res.json(user);
    }
    //
    function register(req, res)
    {
        //console.log(".............................");
        //console.log("In User Services Server....register");

        var newUser = req.body;

        newUser.roles = ['student'];
        newUser.emails = newUser.email.split(",");
        newUser.firstName = "";
        newUser.lastName =  "";

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){

                        //console.log(".............................");
                        //console.log("some login");
                        req.login(user, function(err) {   //login is passport high-level function just like .isAuthenticated,.user,.logOut
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }
    //
    function loggedin(req, res)
    {
        //console.log("In User Services Server....loggedin");

        //res.json(req.session.currentUser);

        res.send(req.isAuthenticated() ? req.user : '0');
    }
    //
    function logout(req, res)
    {
        //console.log("In User Services Server....logout");
        //req.session.destroy();
        //res.send(200);
        req.logOut();
        res.send(200);
    }
    //
    function isAdmin(req, res, next)
    {
        console.log(".........................");
        console.log("In server services isAdmin");
        console.log(req.user.roles.indexOf("admin"));

        if (req.isAuthenticated() && req.user.roles.indexOf("admin") != -1)
        {
            next();
        }
        else
        {
            res.send(403);
        }
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
    //
    //function serializeUser(user, done)
    //{
    //    //console.log("In User Services Server....serializeUser");
    //    done(null, user);
    //}
    //
    //function deserializeUser(user, done)
    //{
    //    //console.log("In User Services Server....deserializeUser");
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

};