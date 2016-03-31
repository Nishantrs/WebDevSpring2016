/**
 * Created by NishantRatnakar on 3/4/2016.
 */


"use strict";

(function(){

    angular
        .module("HotelReview")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $scope, $rootScope, UserService, $routeParams){


        console.log("in profile controller");

        var vm = this;
        var userId = $routeParams.userId;

        vm.profileEdit = profileEdit;
        vm.cancelEdit = cancelEdit;
        vm.saveProfileEdit = saveProfileEdit;
        vm.update = {};

        function init()
        {
            console.log("in init()");

            vm.pmessage = "";


            UserService.findUserById(userId)
            .then(function(response)
            {
                var user = response.data;



                if(user)
                {
                    UserService.setDisplayUser(user);

                    vm.displayUser = UserService.getDisplayUser();

                    //vm.username = user.username;
                    //vm.bio = user.bio;
                    //vm.password = user.password;
                    //vm.firstName = user.firstName;
                    //vm.lastName = user.lastName;
                    //vm.email = user.email;
                    //vm.city = user.city;
                    //vm.state = user.state;
                    //console.log($rootScope.currentUser.username);
                    //console.log($rootScope.displayUser.username);
                    //console.log($rootScope.currentUser.username != $rootScope.displayUser.username);

                    vm.userdetailsedit = false;
                    //$scope.isCollapsedtrips = true;
                    //$scope.isCollapsedfollowers = true;
                    //$scope.isCollapsedfollowing = true;

                    //$scope.newsummary = "";
                    //$scope.newcontent = "";
                    //$scope.newtitle = "";


                }
                else
                {
                    $location.path("/home");
                }
            },function (err) {
                console.log(err);
            });

           //var user = UserService.getDisplayUser();
           //
           // console.log(user);
            //    .then(function(response)
            //{
            //    var userDisplay = response.data;
            //
            //    vm.username = userDisplay.username;
            //    vm.bio = userDisplay.bio;
            //},function (err)
            //{
            //    console.log(err);
            //});



        }

        init();

        function profileEdit()
        {
            console.log("In profile edit");
                vm.userdetailsedit = true;
                vm.update.lastname=vm.displayUser.lastName;
                vm.update.firstname=vm.displayUser.firstName;
                vm.update.password=vm.displayUser.password;
                vm.update.email =vm.displayUser.email;
                vm.update.city =vm.displayUser.city;
                vm.update.state =vm.displayUser.state;
                vm.update.bio = vm.displayUser.bio;

        }

        function cancelEdit()
        {
            console.log("In cancel Edit");
            vm.userdetailsedit = false;
        }

        function saveProfileEdit(updateUser){

            console.log("In saveProfileEdit");

            if (updateUser.firstname == "" ||
                updateUser.lastname == "" ||
                updateUser.password == "" ||
                updateUser.email == "" ||
                updateUser.bio == "" ||
                updateUser.city == "" ||
                updateUser.state == "")
            {
                alert("Please enter all the details");
                return;
            }


            UserService.getCurrentUser()
            .then(function(response)
            {
                var user = response.data;

                var newUser =
                {
                    "_id": user._id,
                    "firstName": updateUser.firstname,
                    "lastName": updateUser.lastname,
                    "username": user.username,
                    "password": updateUser.password,
                    "email": updateUser.email,
                    "roles": user.roles,
                    "bio": updateUser.bio,
                    "city": updateUser.city,
                    "state": user.state,
                    "follower": user.follower,
                    "following": user.following
                };

                console.log(newUser);

                UserService.updateUser(user._id,newUser)
                    .then(function(response)
                    {
                        var updatedUser = response.data;


                        if(updatedUser)
                        {
                            console.log('Updated User');
                            console.log(updatedUser);

                            UserService.setDisplayUser(updatedUser);
                            UserService.setCurrentUser(updatedUser);
                            UserService.userLogged(true);
                            init();
                        }
                        else
                        {
                            alert("Profile cannot be update!!!");
                            return;
                        }
                },function (err) {
                        console.log(err);
                    });

            },function (err) {
                console.log(err);
            });


        }

        //var uid = $routeParams.userId;
        //$scope.update = update;
        //var model = this;
        //
        //if(!$rootScope.currentUser)
        //{
        //    $location.url("/home");
        //}
        //else
        //{
        //    $scope.$location = $location;
        //
        //    var user = $rootScope.currentUser;
        //    console.log(user);
        //    console.log(model);
        //
        //
        //    model.name = user.username;
        //    model.Password = user.password;
        //    model.FirstName = user.firstName;
        //    model.LastName = user.lastName;
        //    model.Email = user.email;
        //    model.bio = user.bio;
        //    $scope.pmessage = null;
        //
        //}
        //
        //
        //
        //function update(muser) {
        //
        //
        //    //var updatedUser =
        //    //{
        //    //    "_id": user._id,
        //    //    "firstName": FirstName,
        //    //    "lastName": LastName,
        //    //    "username": name,
        //    //    "password": Password,
        //    //    "email": Email,
        //    //    "roles": user.roles
        //    //};
        //
        //
        //    if (muser.name == "" || muser.Password == "" || muser.FirstName == "" || muser.LastName == "" || muser.Email == "") {
        //        $scope.pmessage = "Please enter all the details";
        //        console.log($scope.pmessage);
        //    }
        //    else {
        //        var updatedUser =
        //        {
        //            "_id": user._id,
        //            "firstName": muser.FirstName,
        //            "lastName": muser.LastName,
        //            "username": muser.name,
        //            "password": muser.Password,
        //            "email": muser.Email,
        //            "roles": user.roles,
        //            "bio": muser.bio,
        //            "city": user.city,
        //            "state": user.state
        //        };
        //
        //        var updateCurrentUser = function (uUser) {
        //            $rootScope.currentUser = uUser;
        //            $location.path("/profile/"+ uid);
        //            $scope.pmessage = "Profile updated!!!";
        //        };
        //
        //        UserService.updateUser(user._id, updatedUser, updateCurrentUser);
        //
        //    }
        //}
    }


})();