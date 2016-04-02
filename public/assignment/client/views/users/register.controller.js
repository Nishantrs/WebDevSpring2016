/**
 * Created by NishantRatnakar on 2/28/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, $rootScope, UserService){

        var vm = this;
        vm.register = register;

        function init()
        {
            console.log("In register controller");
        }

        init();

        $scope.rmessage = null;


        function register(user)
        {

            if(!user.username)
            {
                $scope.rmessage = "Please provide a username";
                return;
            }

            if (!user.password || !user.passwordverify)
            {
                $scope.rmessage = "Please provide a password";
                return;
            }

            if(!user.email)
            {
                $scope.rmessage = "Please provide an email";
                return;
            }

            if (user.password != user.passwordverify)
            {
                $scope.rmessage = "Password provided does not match. Please re-enter details.";
                return;
            }



                var userObj = {"username": user.username, "password": user.password, "emails": user.email, "roles":"[student]", "firstName": "", "lastName": ""};

                userObj.emails = user.email.split(",");

            //console.log(userObj.username);


            UserService.findUserByUsername(userObj.username)
            .then(function(response)
            {

                var user = response.data;

                if(user)
                {
                    $scope.rmessage = "Username Already Exists!!!"
                }
                else
                {
                    UserService.createUser(userObj)
                        .then(function(response)
                        {
                            var newUser = response.data;

                            if(newUser)
                            {
                                UserService.setCurrentUser(newUser);
                                $location.url("/profile");
                                //$location.url("/profile/"+ newUser._id);
                            }
                            else
                            {
                                $scope.rmessage = "Please try again"
                            }
                        },function (error)
                        {
                            console.log(error);
                        });
                }
            },function (error)
            {
                console.log(error);
            });

                //UserService.createUser(userObj)
                //    .then(function(response)
                //    {
                //       var newUser = response.data;
                //
                //        if(newUser)
                //        {
                //            UserService.setCurrentUser(newUser);
                //            $location.url("/profile");
                //            //$location.url("/profile/"+ newUser._id);
                //        }
                //        else
                //        {
                //            $scope.rmessage = "Please try again"
                //        }
                //    },function (error)
                //    {
                //        console.log(error);
                //    });

        }
    }

})();