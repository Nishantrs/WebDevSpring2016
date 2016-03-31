
/**
 * Created by NishantRatnakar on 3/4/2016.
 */


"use strict";

(function(){

    angular
        .module("HotelReview")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){


        var vm = this;
        vm.register = register;

        function init()
        {
            console.log("In register controller");

            vm.rmessage = null;
            vm.user = {username: "", password: "", passwordverify: "", email: "", city: "", state: "", firstName: "", lastName: ""};

        }

        init();

        function register(user)
        {

            if(!user)
            {
                vm.rmessage = "Please enter required details";
                return;
            }

            if(!user.username)
            {
                vm.rmessage = "Please provide a username";
                return;
            }

            if (!user.password || !user.passwordverify)
            {
                vm.rmessage = "Please provide a password";
                return;
            }

            if(!user.email)
            {
                vm.rmessage = "Please provide an email";
                return;
            }

            if (user.password != user.passwordverify)
            {
                vm.rmessage = "Password provided does not match. Please re-enter details.";
                return;
            }

            isUsernameDuplicate(user);

            function isUsernameDuplicate(user)
            {

                console.log(user);
                UserService
                    .findUserByUsername(user.username)
                    .then(function (response) {

                        var duplicateUser = response.data;
                        console.log("In register controller...duplicate check");
                        console.log(duplicateUser);
                        console.log(duplicateUser !== null);

                        if (duplicateUser !== null)
                        {
                            console.log("In isUsernameDuplicate true");
                            vm.rmessage = "Username already exists";
                            return;
                        }
                        else
                        {
                            //console.log("In isUsernameDuplicate false");
                            //
                            //console.log("Before Create User Body");
                            //
                            //console.log(user);

                            UserService
                                .createUser(user)
                                .then(function(response)
                                {
                                    var currentUser = response.data;
                                    console.log(currentUser);
                                    if(currentUser)
                                    {
                                        UserService.setCurrentUser(currentUser);
                                        UserService.setDisplayUser(currentUser);
                                        UserService.userLogged(true);
                                        $location.path("/profile/"+currentUser._id)
                                    }
                                },function (err)
                                {
                                    console.log(err);
                                });

                        }
                    });
            }
        }
    }
})();