/**
 * Created by NishantRatnakar on 3/20/2016.
 */
var uuid = require('node-uuid');

module.exports = function(app, userModel)
{

    app.post("/api/project/user", createUser);

    app.put("/api/project/user/:id", updateUserById);

    app.delete("/api/project/user/:id", deleteUserById);

    app.get("/api/project/user", decideEndpoint);

    app.get("/api/project/loggedin", loggedIn);

    app.post("/api/project/logout", logout);


    function decideEndpoint(req, res)
    {

        console.log("In server services Deciding Endpoint...");

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
        console.log("In server services createUser");

        var newUser = req.body;

        //once database connection is established
        //userModel.createUser(newUser)
        //    .then (
        //        function (user)
        //        {
        //            res.json (user);
        //        },
        //        function (err)
        //        {
        //            res.status (400).send ( err);
        //        }
        //    );

        res.json(userModel.createUser(newUser));
    }

    function getAllUsers(req, res)
    {
        console.log("In server services getAllUsers");

        userModel
            .getAllUsers()
            .then(function(users)
            {
            res.json(users);
            });

        //res.json(userModel.getAllUsers());
    }

    function findUserById(req, res)
    {
        console.log("In server user services findUserById");

        var userId = req.query.id;

        res.json(userModel.findUserById(userId));
    }

    function findUserByUsername(req, res)
    {
        console.log("In server user services findUserByUsername");

        var userName = req.query.username;

        //userModel
        //    .findUserByUsername(userName)
        //    .then(function(user)
        //    {
        //    res.json(user);
        //    });

        res.json(userModel.findUserByUsername(userName));
    }

    function findUserByCredentials(req, res)
    {

        console.log("In server user services findUserByCredentials");

        var userName = req.query.username;
        var userPassword = req.query.password;

        console.log(userName);
        console.log(userPassword);

        req.session.currentUser = userModel.findUserByCredentials(userName, userPassword);

        res.json(userModel.findUserByCredentials(userName, userPassword));
    }


    function loggedIn(req, res)
    {
        console.log("In User Services Server....loggedIn");
        res.json(req.session.currentUser);
    }

    function updateUserById(req, res)
    {

        console.log("In server user services update user");

        var userId = req.params.id;
        var userObj = req.body;

        console.log(userId);
        console.log(userObj);

        res.json(userModel.updateUserById(userId, userObj));

    }

    function deleteUserById(req, res)
    {
        console.log("In server user services delete user");

        var userId = req.params.id;

        res.json(userModel.deleteUserById(userId));
    }

    function logout(req,res)
    {
        console.log("In User Services Server....logout");
        //req.session.destroy();
        //res.status(400);
        //console.log("In User Services Server....before send");
        res.send("logged out");
    }

    //function loggedin(req, res)
    //{
    //    res.json(req.session.currentUser);
    //}
    //
    //function logout(req, res)
    //{
    //    console.log("In User Services Server....logout");
    //    req.session.destroy();
    //    res.send(200);
    //}


};