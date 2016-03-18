/**
 * Created by NishantRatnakar on 2/28/2016.
 */



(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($http, $rootScope) {

        //var users =
        //    [
        //        {
        //            "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
        //            "username": "alice", "password": "alice", "roles": ["student"], "email":""
        //        },
        //        {
        //            "_id": 234, "firstName": "Bob", "lastName": "Hope",
        //            "username": "bob", "password": "bob", "roles": ["admin"],"email":""
        //        },
        //        {
        //            "_id": 345, "firstName": "Charlie", "lastName": "Brown",
        //            "username": "charlie", "password": "charlie", "roles": ["faculty"], "email":""
        //        },
        //        {
        //            "_id": 456, "firstName": "Dan", "lastName": "Craig",
        //            "username": "dan", "password": "dan", "roles": ["faculty", "admin"], "email":""
        //        },
        //        {
        //            "_id": 567, "firstName": "Edward", "lastName": "Norton",
        //            "username": "ed", "password": "ed", "roles": ["student"], "email":""
        //        }
        //    ];

        //Function declarations
        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,



            // New functions
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            findUserByUsername:findUserByUsername,
            findUserById:findUserById
        };

        return api;


        //Function implementation
        //function findUserByCredentials(username, password, callback)
        //{
        //    var found = null;
        //
        //    for (var i = 0; i < users.length; i++) {
        //
        //        if (users[i].username == username && users[i].password == password) {
        //            found = users[i];
        //            break;
        //        }
        //    }
        //
        //    callback(found);
        //}

        function findUserByCredentials(credentials)
            {
                console.log("In User Services");
                //return $http.get("/api/assignment/user?username=" +credentials.username+ "&password=" +credentials.password);
                return $http.get("/api/assignment/user/" +credentials.username+ "/" +credentials.password);
            }



        //function findAllUsers(callback)
        //{
        //    callback(users);
        //}

        function findAllUsers()
        {
            return $http.get("/api/assignment/user");
        }

        //function createUser(user, callback)
        //{
        //    var newId = (new Date).getTime();
        //    user._id = newId;
        //    users.push(user);
        //    callback(user);
        //    console.log(user);
        //}

        function createUser(user)
        {
            return $http.post("/api/assignment/user", user);
        }


        //function deleteUserById(userId, callback)
        //{
        //    for(var i=0; i < users.length; i++)
        //    {
        //        if(users[i]._id == userId)
        //        {
        //            users.splice(i,1);
        //            break;
        //        }
        //    }
        //    callback(users);
        //}

        function deleteUserById(userId)
        {
            return $http.delete("/api/assignment/user/" +userId);
        }


        //function updateUser(userId, user, callback)
        //{
        //    for(var i=0; i < users.length; i++)
        //    {
        //        if(users[i]._id == userId)
        //        {
        //            users[i] = user;
        //            callback(users[i]);
        //            console.log(users[i]);
        //            break;
        //        }
        //    }
        //}

        function updateUser(userId,user)
        {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        //////////////////////////////////////////////////////////

        function findUserByUsername(username)
        {
            return $http.get("/api/assignment/user/?username" + username);
        }

        function findUserById(userId)
        {
            return $http.get("/api/assignment/user/" + userId);
        }

        function setCurrentUser(user)
        {
            $rootScope.currentUser = user;
        }

        function getCurrentUser()
        {
            return  $rootScope.currentUser;
        }

    }

})();