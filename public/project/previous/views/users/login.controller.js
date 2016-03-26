/**
 * Created by NishantRatnakar on 3/4/2016.
 */



"use strict";

(function(){

    angular
        .module("HotelReview")
        .controller("LoginController", LoginController);

    function LoginController($location, $scope, $rootScope, UserService){

        $scope.$location = $location;
        $scope.lmessage = null;
        var model = this;

        $scope.login = login;

        function login(cred)
        {

            if(cred == undefined)
            {
                $scope.lmessage = "Please enter credentials."
            }
            else if (cred.password == undefined)
            {
                $scope.lmessage = "Please enter password."
            }
            else if(cred.username == undefined)
            {
                $scope.lmessage = "Please enter username.";
            }
            else {


                var userLogin = function (cUser) {
                    if (cUser == null) {
                        $scope.lmessage = "Invalid credentials.";
                        $scope.model.username = null;
                        $scope.model.password = null;
                    }
                    else {
                        $scope.lmessage = null;
                        $rootScope.currentUser = cUser;
                        $rootScope.displayUser = cUser;

                        var userId = cUser._id;

                        $location.path("/profile/"+ userId);
                    }

                };

                UserService.findUserByCredentials(cred.username, cred.password, userLogin);
            }

        }

    }



})();