/**
 * Created by NishantRatnakar on 4/11/2016.
 */

"use strict";

(function(){

    angular
        .module("HotelReview")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $filter)
    {

        var vm = this;
        var orderBy = $filter('orderBy');
        vm.message = null;
        vm.predicate = 'username';
        vm.reverse = false;

        function init()
        {
            UserService.getCurrentUser()
            .then(function(response)
            {
                var user = response.data;

                UserService
                    .findAllUsers()
                    .then(
                        function(response)
                        {
                            var userLists = response.data;

                            for (var i = 0; i < userLists.length; i++)
                            {
                                if (userLists[i]._id == user._id)
                                {
                                    userLists.splice(i, 1);
                                    break;
                                }
                            }

                            vm.users = userLists;
                            refreshSort();
                            console.log(vm.users);
                        },function(err)
                        {
                            console.log(err);
                        });

            },function(err)
            {
                console.log(err);
            });
                unselectUser();

        }
        init();

        vm.user = null;
        vm.selectedUser = null;

        //functions
        //vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.unselectUser = unselectUser;
        vm.deleteUser = deleteUser;
        vm.toggleSort = toggleSort;

        function toggleSort(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
            vm.users = orderBy(vm.users, vm.predicate, vm.reverse);
        }

        function refreshSort(){
            vm.users = orderBy(vm.users, vm.predicate, vm.reverse);
        }


        function selectUser(user){
            vm.user = angular.copy(user);
            vm.selectedUser = true;
        }

        function unselectUser(){
            vm.user = null;
            vm.selectedUser = false; //was null
        }

        function deleteUser(user){

            UserService
                .getCurrentUser()
                .then(function(userAdmin)
                {
                    if(user._id != userAdmin._id)
                    {
                        UserService
                            .deleteUserById(user._id)
                            .then(function(response){
                                if(response.data)
                                {
                                    init();
                                }
                                else
                                {
                                   console.log("Unable to delete user!!!")
                                }

                            },function(err)
                            {
                                console.log(err);
                            });
                    }
                    else
                    {

                        vm.message = "Cannot delete as you are in session!!!";
                    }
                },function(err)
                {
                    console.log(err);
                });



        }

        function updateUser(user){
            if(user && user.username && user.password){
                var updatedUser = angular.copy(user);
                delete updatedUser._id;
                if(typeof user.roles == "string") {
                    updatedUser.roles = user.roles.split(",");
                }
                UserService
                    .editUser(user._id, updatedUser)
                    .then(function(response){

                        var user = response.data;
                        if(user)
                        {
                            init();
                        }
                        else
                        {
                            vm.message = "Please provide unique username";
                        }
                    });
            }
            else
            {
                vm.message = "Please provide user credentials properly";
            }
        }
    }

})();
