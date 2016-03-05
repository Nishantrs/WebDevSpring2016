/**
 * Created by NishantRatnakar on 2/28/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, $rootScope, UserService){
        $scope.$location=$location;

        $scope.register = register;
        $scope.rmessage = null;


        function register(username, password, verifypassword, email)
        {
            var setCurrentUser = function (nUser)
            {
               $rootScope.currentUser = nUser;
               $location.url("/profile")
            };

            if (username == null || password == null || verifypassword == null || email == null) // null as object is still not created in register.
            {
                $scope.rmessage = "Please enter all the details";
                console.log($scope.rmessage);
            }
            else if (password != verifypassword)
            {
                $scope.rmessage = "Password provided does not match. Please re-enter details.";
                console.log($scope.rmessage);
            }
            else
            {
                var user = {"username": username, "password": password, "email": email, "roles":"[student]", "firstName": "", "lastName": ""};
                UserService.createUser(user, setCurrentUser);
            }
        }
    }

})();