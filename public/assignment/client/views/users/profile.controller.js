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

        vm.user = null;
        vm.location = $location;
        vm.changePassword = false;
        //var userId = $routeParams.id;


        function init()
        {

            //console.log("In profile controller");

            var user = UserService.getCurrentUser()
                .then(function(response)
                {
                    var user = response.data;

                    if(user)
                    {

                        vm.username= user.username;
                        vm.password= user.password;
                        vm.firstName = user.firstName;
                        vm.lastName = user.lastName;
                        vm.email = user.emails;
                        vm.phone = user.phones;
                    }
                    //else
                    //{
                    //    $location.url("/home");
                    //}
                },function (err)
                {
                    console.log(err);
                });
        }

        init();

        function update(username, Password, FirstName, LastName, Email, Phone)
        {
            //console.log("In here...");

            //console.log(!vm.changePassword);


            //have to change logic of the code.....dependency on currentUser instead of expecting just single user after update
            //console.log("In update function");

            $scope.message="null";

            if (username == "" || Password == "" || FirstName == "" || LastName == "" || Email == "" || Phone == "")
            {
                $scope.pmessage = "Please enter all the details";
                //console.log($scope.pmessage);
            }
            else
            {
                UserService.getCurrentUser()
                    .then(function(response)
                    {
                        var currentUser = response.data;

                        var id = currentUser._id;

                        if(typeof Email == "string")
                        {
                            Email = Email.split(",");
                        }

                        if(typeof Phone == "string")
                        {
                            Phone = Phone.split(",");
                        }

                        var userDetails =
                        {
                            "_id":id,
                            "username":username,
                            "password":Password,
                            "firstName":FirstName,
                            "lastName":LastName,
                            "emails":Email,
                            "roles":currentUser.roles,
                            "phones":Phone
                        };

                        if(!vm.changePassword)
                        {
                            //console.log("In here!!!");
                            delete userDetails.password;
                        }

                        UserService.updateUser(id,userDetails)
                            .then(function(response)
                            {
                                //console.log(response.data);

                                if(response.data)
                                {
                                    UserService.setCurrentUser(response.data);
                                    //$scope.pmessage = "Your Profile has been updated!!!";
                                    alert("Your Profile has been updated!!!");
                                    init();
                                }
                                else
                                {
                                    $scope.pmessage = "Sorry! Please enter your details again!!!";
                                }
                            },function (err)
                            {
                                console.log(err);
                            });

                    },function (err)
                    {
                        console.log(err);
                    });


            }
        }
        }



})();