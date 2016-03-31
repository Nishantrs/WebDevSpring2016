/**
 * Created by NishantRatnakar on 2/28/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $scope, UserService, $routeParams){

        var vm = this;
        vm.update = update;
        var userId = $routeParams.id;


        function init()
        {

            console.log("In profile controller");

            UserService
            .findUserById(userId)
            .then(function(response)
            {
                var user = response.data;

                console.log(user);

                if(user)
                {
                    UserService.setCurrentUser(user);

                    var currentUser = UserService.getCurrentUser();

                    vm.username= currentUser.username;
                    vm.password= currentUser.password;
                    vm.firstName = currentUser.firstName;
                    vm.lastName = currentUser.lastName;
                    vm.email = currentUser.emails;
                }
                else
                {
                    $location.url("/home");
                }
            },function(err)
            {
                console.log(err);
            });

        }

        init();

        function update(username, Password, FirstName, LastName, Email)
        {
            console.log("In update function");

            $scope.message="null";

            if (username == "" || Password == "" || FirstName == "" || LastName == "" || Email == "")
            {
                $scope.pmessage = "Please enter all the details";
                console.log($scope.pmessage);
            }
            else
            {
                var currentUser = UserService.getCurrentUser();

                var id = currentUser._id;

                var userDetails =
                {
                    "_id":id,
                    "username":username,
                    "password":Password,
                    "firstName":FirstName,
                    "lastName":LastName,
                    "emails":Email,
                    "roles":currentUser.roles,
                    "phones":currentUser.phones
                };
                UserService.updateUser(id,userDetails)
                    .then(function(response)
                    {
                        console.log(response.data);

                        if(response.data)
                        {
                            UserService.setCurrentUser(response.data);
                            $scope.pmessage = "Your Profile has been updated!!!";
                        }
                        else
                        {
                            $scope.pmessage = "Sorry! Please enter your details again!!!";
                        }
                    },function (err)
                    {
                        console.log(err);
                    });
            }
        }
        }



})();