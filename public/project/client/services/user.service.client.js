/**
 * Created by NishantRatnakar on 3/9/2016.
 */


(function(){

    angular
        .module("HotelReview")
        .factory("UserService", UserService);


    function UserService($http, $rootScope) {

        console.log("In UserService");
        //var users =
        //    [
        //        {
        //            "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
        //            "username": "a", "password": "a", "roles": ["user"], "email":"", "bio": "I am a user.","city": "Boston","state": "Massachusetts"
        //        },
        //        {
        //            "_id": 234, "firstName": "Bob", "lastName": "Hope",
        //            "username": "b", "password": "b", "roles": ["admin"],"email":"", "bio": "I am a admin.","city": "Boston","state": "Massachusetts"
        //        },
        //        {
        //            "_id": 345, "firstName": "Charlie", "lastName": "Brown",
        //            "username": "charlie", "password": "charlie", "roles": ["user"], "email":"", "bio": "I am a user.","city": "Boston","state": "Massachusetts"
        //        },
        //        {
        //            "_id": 456, "firstName": "Dan", "lastName": "Craig",
        //            "username": "dan", "password": "dan", "roles": ["user", "admin"], "email":"", "bio": "I am a admin.","city": "Boston","state": "Massachusetts"
        //        },
        //        {
        //            "_id": 567, "firstName": "Edward", "lastName": "Norton",
        //            "username": "ed", "password": "ed", "roles": ["user"], "email":"", "bio": "I am a user.","city": "Boston","state": "Massachusetts"
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
            findUserByUsername:findUserByUsername,
            findUserById:findUserById,

            //local functions: currentUser
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,

            //local functions: displayUser
            isDisplayUser: isDisplayUser,
            isNotDisplayUser: isNotDisplayUser,
            setDisplayUser: setDisplayUser,
            getDisplayUser: getDisplayUser,

            //local functions: admin
            isAdmin: isAdmin,
            isNotAdmin: isNotAdmin,

            userLogged: userLogged,

            logout: logout
        };

        return api;


        function findUserByCredentials(credentials)
        {
            console.log("In User Services Client....findUserByCred");
            console.log(credentials);
            return $http.get("/api/project/user?username=" +credentials.username+ "&password=" +credentials.password);
        }


        function findAllUsers()
        {
            console.log("In User Services Client....findAllUsers");
            return $http.get("/api/project/user");
        }


        function createUser(user)
        {
            console.log("In User Services Client....createUser");
            return $http.post("/api/project/user", user);
        }



        function deleteUserById(userId)
        {
            console.log("In User Services Client....deleteUserById");
            return $http.delete("/api/project/user/" +userId);
        }



        function updateUser(userId,user)
        {
            console.log("In User Services Client....updateUser");
            return $http.put("/api/project/user/" + userId, user);
        }


        //New functions

        function findUserByUsername(username)
        {
            console.log("In User Services Client....findUserByUsername");
            return $http.get("/api/project/user?username=" + username);
        }

        function findUserById(userId)
        {
            console.log("In User Services Client....findUserById");
            console.log(userId);
            return $http.get("/api/project/user?id=" + userId);
        }


        //local functions: currentUser
        function setCurrentUser(user)
        {
            console.log("In User Services Client....setCurrentUser");
            $rootScope.currentUser = user;
        }

        function getCurrentUser()
        {
            console.log("In User Services Client....getCurrentUser/loggedIn");
            //return  $rootScope.currentUser;

            return $http.get("/api/project/loggedin");
        }


        //local functions: displayUser
        function isDisplayUser(user)
        {
            console.log("In User Services Client....setDisplayUser");
            $rootScope.isDisplayUser = true;
        }

        function isNotDisplayUser()
        {
            console.log("In User Services Client....getDisplayUser");
            $rootScope.isDisplayUser = false;
        }

        function setDisplayUser(user)
        {
            console.log("In User Services Client....setDisplayUser");
            $rootScope.displayUser = user;
        }

        function getDisplayUser()
        {
            console.log("In User Services Client....getDisplayUser");
            return $rootScope.displayUser;
        }


        //local functions: admin
        function isAdmin(user)
        {
            console.log("In User Services Client....isAdmin");
            $rootScope.isAdminUser = true;
        }

        function isNotAdmin(user)
        {
            console.log("In User Services Client....isNotAdmin");
            $rootScope.isAdminUser = false;
        }

        function userLogged(value)
        {
            $rootScope.userLogged = value;
        }

        function logout()
        {
            console.log("In User Services Client....logout");
            return $http.post("/api/project/logout");
        }
    }

})();
