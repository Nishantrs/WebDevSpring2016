/**
 * Created by NishantRatnakar on 3/17/2016.
 */


module.exports = function(app, userModel)
{

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res)
    {
        var newUser = req.body;

        newUser._id = uuid.v1(); //time based id created.

        userModel
            .createUser(newUser)
            .then(function (users)
                    {
                res.json(users);
                    })
    }

    function getAllUsers(req, res)
    {
        userModel
            .getAllUsers()
            .then(function(users)
                    {
                        res.json(users);
                    })
    }

    function findUserById(req, res)
    {
        var userId = req.params.id;

        userModel
            .findUserById(userId)
            .then(function(user)
                    {
                        res.json(user);
                    })
    }

    function findUserByUsername(req, res)
    {
        var userName = req.params.username;

        userModel
            .findUserByUsername(userName)
            .then(function(user)
                    {
                        res.json(user);
                    })
    }

    function findUserByCredentials(req, res)
    {
        var userName = req.params.username;
        var userPassword = req.params.password;

        userModel
            .findUserByCredentials(userName, userPassword)
            .then(function(user)
                    {
                        res.json(user);
                    })
    }

    function updateUserById(req, res)
    {

        var userId = req.params.id;
        var userObj = req.body;
        userModel
            .updateUserById(userId, userObj)
            .then(function(users)
            {
                res.json(users);
            });

    }

    function deleteUserById(req, res)
    {
        var userId = req.params.id;
        userModel
            .deleteUserById(userId)
            .then(function(users)
            {
                res.json(users);
            });
    }


};