/**
 * Created by NishantRatnakar on 3/4/2016.
 */



"use strict";

(function(){

    angular
        .module("HotelReview")
        .controller("LoginController", LoginController);

    function LoginController($location,UserService)
    {

        //console.log("in login controller");

        var vm = this;
        vm.login = login;

        function init()
        {
            vm.lmessage = "";
            vm.credential = {username:"",password:""};
        }

        init();

        function login(cred)
        {

            if(cred.username == "" && cred.password == "")
            {
                vm.lmessage = "Please enter credentials.";
                return;
            }
            else if (!cred.password)
            {
                vm.lmessage = "Please enter password.";
                return;
            }
            else if(!cred.username)
            {
                vm.lmessage = "Please enter username.";
                return;
            }
            else
            {
                UserService
                    .findUserByCredentials(cred)
                    .then(function(response)
                    {
                        var userFound = response.data;

                        //console.log(userFound);

                        if(userFound !== null)
                        {
                            UserService.setCurrentUser(userFound);
                            UserService.setDisplayUser(userFound);
                            //$location.path("/profile/"+userFound._id);
                            $location.path("/profile")

                        }
                        else
                        {
                            vm.lmessage = "Invalid credentials.";
                        }

                    });
            }

        }

    }



})();