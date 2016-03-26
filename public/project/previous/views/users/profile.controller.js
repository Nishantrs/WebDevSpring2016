/**
 * Created by NishantRatnakar on 3/4/2016.
 */


"use strict";

(function(){

    angular
        .module("HotelReview")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $scope, $rootScope, UserService, $routeParams){

        var uid = $routeParams.userId;
        $scope.update = update;
        var model = this;

        if(!$rootScope.currentUser)
        {
            $location.url("/home");
        }
        else
        {
            $scope.$location = $location;

            var user = $rootScope.currentUser;
            console.log(user);
            console.log(model);


            model.name = user.username;
            model.Password = user.password;
            model.FirstName = user.firstName;
            model.LastName = user.lastName;
            model.Email = user.email;
            model.bio = user.bio;
            $scope.pmessage = null;

        }



        function update(muser) {


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


            if (muser.name == "" || muser.Password == "" || muser.FirstName == "" || muser.LastName == "" || muser.Email == "") {
                $scope.pmessage = "Please enter all the details";
                console.log($scope.pmessage);
            }
            else {
                var updatedUser =
                {
                    "_id": user._id,
                    "firstName": muser.FirstName,
                    "lastName": muser.LastName,
                    "username": muser.name,
                    "password": muser.Password,
                    "email": muser.Email,
                    "roles": user.roles,
                    "bio": muser.bio,
                    "city": user.city,
                    "state": user.state
                };

                var updateCurrentUser = function (uUser) {
                    $rootScope.currentUser = uUser;
                    $location.path("/profile/"+ uid);
                    $scope.pmessage = "Profile updated!!!";
                };

                UserService.updateUser(user._id, updatedUser, updateCurrentUser);

            }
        }
    }


})();