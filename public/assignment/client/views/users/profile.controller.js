/**
 * Created by NishantRatnakar on 2/28/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $scope, $rootScope, UserService){

        $scope.update = update;

        if(!$rootScope.currentUser)
        {
            $location.url("/home");
        }
       else
        {
            var user = $rootScope.currentUser;

            $scope.$location = $location;
            $scope.username = user.username;
            $scope.userPassword = user.password;
            $scope.userFirstName = user.firstName;
            $scope.userLastName = user.lastName;
            $scope.userEmail = user.email;
            $scope.pmessage = null;

        }



        function update(name, Password, FirstName, LastName, Email) {


            //var updatedUser =
            //{
            //    "_id": user._id,
            //    "firstName": FirstName,
            //    "lastName": LastName,
            //    "username": name,
            //    "password": Password,
            //    "email": Email,
            //    "roles": user.roles
            //};


            if (name == "" || Password == "" || FirstName == "" || LastName == "" || Email == "") {
                $scope.pmessage = "Please enter all the details";
                console.log($scope.pmessage);
            }
            else {
                var updatedUser =
                {
                    "_id": user._id,
                    "firstName": FirstName,
                    "lastName": LastName,
                    "username": name,
                    "password": Password,
                    "email": Email,
                    "roles": user.roles
                };

                var updateCurrentUser = function (uUser) {
                    $rootScope.currentUser = uUser;
                    $location.url("/profile");
                    $scope.pmessage = "Profile updated!!!";
                };

                UserService.updateUser(user._id, updatedUser, updateCurrentUser);

            }
        }
        }



})();