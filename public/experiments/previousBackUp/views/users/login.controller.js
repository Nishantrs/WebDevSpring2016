/**
 * Created by NishantRatnakar on 2/28/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, $scope, $rootScope, UserService){

        $scope.$location = $location;
        $scope.lmessage = null;

        $scope.login = login;

        function login(username, password)
        {

            var userLogin = function (cUser)
            {
                if (cUser == null)
                {
                    $scope.lmessage = "Invalid credentials."
                }
                else
                {
                    $scope.lmessage = null;
                    $rootScope.currentUser = cUser;
                    $location.url("/profile")
                }

            };

            UserService.findUserByCredentials(username, password, userLogin);


        }
    }

})();