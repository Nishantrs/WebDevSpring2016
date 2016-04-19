/**
 * Created by NishantRatnakar on 3/20/2016.
 */

module.exports = function(app, userModel)
{

    app.post("/api/project/user", createUser);

    app.put("/api/project/user/:id", updateUserById);

    app.delete("/api/project/admin/:id", deleteUserById);

    app.get("/api/project/user", decideEndpoint);

    app.put('/api/project/user',addFollower);

    app.get("/api/project/loggedin", loggedIn);

    app.put("/api/project/unfollow", removeFollower);

    app.post("/api/project/logout", logout);

    app.put("/api/project/admin/user/:id", editUser);


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
                        req.session.currentUser = user;
                        res.json(user);
                    },
                    function(err)
                    {
                        res.status(400).send(err);
                    });

        //}
        //else
        //{
        //    console.log(".....................................................");
        //    console.log("In server user services removeFollower");
        //
        //    userModel
        //        .updateUserById(userObj._id, userObj)
        //        .then(function(user)
        //            {
        //                console.log(".....................................................");
        //                console.log("In server user services updated displayUser returned");
        //                console.log(user);
        //                res.json(user);
        //            },
        //            function(err)
        //            {
        //                res.status(400).send(err);
        //            });
        //}


        //res.json(userModel.updateUserById(userId, userObj));

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

    function logout(req,res)
    {
        //console.log(".....................................................");
        //console.log("In User Services Server....logout");
        req.session.destroy();
        res.send(200);
    }

    function loggedIn(req, res)
    {
        //console.log(".....................................................");
        //console.log("In User Services Server....loggedIn");
        res.json(req.session.currentUser);
    }
};