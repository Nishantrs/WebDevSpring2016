/**
 * Created by NishantRatnakar on 3/4/2016.
 */

/**
 * Created by NishantRatnakar on 3/4/2016.
 */


"use strict";

(function(){

    angular
        .module("HotelReview")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, $rootScope, UserService){

        $scope.register = register;
        $scope.$location=$location;

        $scope.rmessage = null;

        function register(cred)
        {
            var setCurrentUser = function (nUser)
            {
                $rootScope.currentUser = nUser;
                $location.path("/profile/"+nUser._id)
            };

            if (cred.username == null || cred.password == null || cred.passwordverify == null || cred.email == null || cred.city == null ||
                cred.state == null || cred.firstName == null || cred.lastName == null) // null as object is still not created in register.
            {
                $scope.rmessage = "Please enter all the details";
                console.log($scope.rmessage);
                console.log(cred.username);
                console.log(cred.password);
                console.log(cred.passwordverify);
                console.log(cred.email);
                console.log(cred.city);
                console.log(cred.state);
                console.log(cred.firstName);
                console.log(cred.firstName);
            }
            else if (cred.password != cred.passwordverify)
            {
                $scope.rmessage = "Password provided does not match. Please re-enter details.";
                console.log($scope.rmessage);
            }
            else
            {
                var user = {"username": cred.username,
                            "password": cred.password,
                            "email": cred.email,
                            "roles":"[user]",
                            "firstName": cred.firstName,
                            "lastName": cred.lastName,
                            "city": cred.city,
                            "state": cred.state,
                            "bio":""};
                UserService.createUser(user, setCurrentUser);
            }
        }

    }



})();