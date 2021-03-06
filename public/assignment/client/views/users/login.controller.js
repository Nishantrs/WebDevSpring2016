/**
 * Created by NishantRatnakar on 2/28/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, $scope, UserService){

        var vm = this;
        vm.login = login;


        function init()
        {

            //console.log("In login controller");
            vm.user = {username:"",password:""};

        }
        init();

        function login(user)
        {
            if(!user)
            {
                $scope.lmessage = "Please enter login details";
                return;
            }
            else if (!user.username)
            {
                $scope.lmessage = "Please enter username";
                return;
            }
            else if(!user.password)
            {
                $scope.lmessage = "Please enter password";
                return;
            }
            else {

                UserService.login(user) //{username:user.username, password:user.password}
                    .then(function (response)
                    {

                        //console.log(response.data);

                        if (response.data)
                        {
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");
                            //$location.url("/profile/"+UserService.getCurrentUser()._id);
                        }
                        else
                        {
                            $scope.lmessage = "Invalid Credential";
                        }
                    },function(err)
                    {
                        //console.log("...................................");
                        //console.log("Error in finding currentUser");
                        //console.log(err);
                        $scope.lmessage = "Invalid Credential";
                    });

            }
        }
    }

})();