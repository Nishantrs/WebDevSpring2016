/**
 * Created by NishantRatnakar on 3/17/2016.
 */


module.exports = function(app, userModel)
{

    app.post("/api/assignment/user", createUser);
    //app.get("/api/assignment/user", getAllUsers);
    //app.get("/api/assignment/user/:id", findUserById);
    //app.get("/api/assignment/user?username=username", findUserByUsername);
    //app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
    //app.get("/api/assignment/user/:username/:password",findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/user", decideEndpoint);
    app.post("/api/assignment/user/logout", logout);
    app.get("/api/assignment/user/loggedin", loggedin);

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

       // userModel.createUser(newUser);

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
        //newUser._id = uuid.v1(); //time based id created.

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
        var userName = req.params.username;
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
        var userName = req.query.username;
        var userPassword = req.query.password;

        console.log(userName);
        console.log(userPassword);

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

        console.log("In server services credential");

        //res.json(userModel.findUserByCredentials(userName, userPassword));
    }

    function updateUserById(req, res)
    {

        console.log("In services update");
        var userId = req.params.id;
        var userObj = req.body;

        console.log(userId);
        console.log(userObj);

        userModel
            .updateUserById(userId, userObj)
            .then(function(user)
            {
                req.session.currentUser = user;
                //res.send(200);
                res.json(user);
            },
                function(err)
                {
                    res.status(400).send(err);
                });

        //res.json(userModel.updateUserById(userId, userObj));

    }

    function deleteUserById(req, res)
    {
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

    function loggedin(req, res)
    {
        console.log("In User Services Server....loggedin");

        res.json(req.session.currentUser);
    }

    function logout(req, res)
    {
        console.log("In User Services Server....logout");
        req.session.destroy();
        res.send(200);
    }


};