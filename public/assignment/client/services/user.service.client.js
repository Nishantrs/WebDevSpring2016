/**
 * Created by NishantRatnakar on 2/28/2016.
 */



(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService($http, $rootScope) {


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
            findUserById:findUserById,
            logout:logout
        };

        return api;


        //Function implementation


        function findUserByCredentials(credentials)
            {
                console.log("In User Services...findUserByCredentials");
                return $http.get("/api/assignment/user?username=" +credentials.username+ "&password=" +credentials.password);
                //return $http.get("/api/assignment/user/" +credentials.username+ "/" +credentials.password);
            }


        function findAllUsers()
        {
            console.log("In User Services...findAllUsers");

            return $http.get("/api/assignment/user");
        }


        function createUser(user)
        {
            console.log("In User Services...createUser");

            return $http.post("/api/assignment/user", user);
        }



        function deleteUserById(userId)
        {
            console.log("In User Services...deleteUserById");

            return $http.delete("/api/assignment/user/" +userId);
        }



        function updateUser(userId,user)
        {
            console.log("In User Services...updateUser");

            return $http.put("/api/assignment/user/" + userId, user);
        }

        //////////////////////////////////////////////////////////

        function findUserByUsername(username)
        {
            console.log("In User Services...findUserByUsername");

            console.log(username);

            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserById(userId)
        {
            console.log("In User Services...findUserById");

            return $http.get("/api/assignment/user?id=" + userId);
        }

        function setCurrentUser(user)
        {
            console.log("In User Services...setCurrentUser");

            $rootScope.currentUser = user;
        }

        function getCurrentUser()
        {
            console.log("In User Services...getCurrentUser");

            return $http.get("/api/assignment/user/loggedin");

            //return  $rootScope.currentUser;
        }

        function logout()
        {
            console.log("In User Services...logout");
            return $http.post("/api/assignment/user/logout");
        }

    }

})();