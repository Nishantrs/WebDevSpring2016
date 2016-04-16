/**
 * Created by NishantRatnakar on 3/9/2016.
 */


(function(){

    angular
        .module("HotelReview")
        .factory("UserService", UserService);


    function UserService($http, $rootScope) {

        //console.log("In UserService");

        //Function declarations
        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            addFollower : addFollower,
            removeFollower : removeFollower,

            // New functions
            findUserByUsername:findUserByUsername,
            findUserById:findUserById,

            //local functions: currentUser
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,

            //local functions: displayUser
            setDisplayUser: setDisplayUser,
            getDisplayUser: getDisplayUser,

            //local functions: admin
            isAdmin: isAdmin,
            isNotAdmin: isNotAdmin,
            editUser : editUser,

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
            return $http.delete("/api/project/admin/" +userId);
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
            //console.log(userId);
            return $http.get("/api/project/user?id=" + userId);
        }


        //local functions: currentUser
        function setCurrentUser(user)
        {
            //console.log("In User Services Client....setCurrentUser");
            $rootScope.currentUser = user;
        }

        function getCurrentUser()
        {
            //console.log("In User Services Client....getCurrentUser/loggedIn");
            //return  $rootScope.currentUser;

            return $http.get("/api/project/loggedin");
        }


        //local functions: displayUser

        function setDisplayUser(user)
        {
            //console.log("In User Services Client....setDisplayUser");
            $rootScope.displayUser = user;
        }

        function getDisplayUser()
        {
            //console.log("In User Services Client....getDisplayUser");
            return $rootScope.displayUser;
        }


        //local functions: admin
        function isAdmin()
        {
            console.log("In User Services Client....isAdmin");
            $rootScope.isAdminUser = true;
        }

        function isNotAdmin()
        {
            console.log("In User Services Client....isNotAdmin");
            $rootScope.isAdminUser = false;
        }

        function addFollower(userId,follower)
        {
            console.log("In User Services Client....addFollower");
            //return $http.put("/api/project/user?userId=" + userId+ "&follower=" + follower);
            return $http.put("/api/project/user?userId=" + userId, follower);
        }

        function removeFollower(updatedDisplayUser)
        {
            console.log("In User Services Client....removeFollower");
            return $http.put("/api/project/unfollow", updatedDisplayUser);
        }

        function editUser(userId, user)
        {
            console.log("In User Services...editUser");
            return $http.put("/api/project/admin/user/"+userId, user);
        }

        function logout()
        {
            //console.log("In User Services Client....logout");
            return $http.post("/api/project/logout");
        }
    }

})();
