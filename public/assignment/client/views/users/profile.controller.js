/**
 * Created by NishantRatnakar on 2/28/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $scope, UserService){

        var vm = this;
        vm.update = update;
        var currentUser = UserService.getCurrentUser();
        vm.username= currentUser.username;
        vm.password= currentUser.password;
        vm.firstName = currentUser.firstName;
        vm.lastName = currentUser.lastName;
        vm.email = currentUser.email;

        function init()
        {

            console.log("In profile controller");

            if(!currentUser)
            {
                $location.url("/home");
            }
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
                var id = currentUser._id;

                var userDetails =
                {
                    "_id":id,
                    "username":username,
                    "password":Password,
                    "firstName":FirstName,
                    "lastName":LastName,
                    "email":Email,
                    "roles":currentUser.roles
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
                    });
            }
        }
        }



})();