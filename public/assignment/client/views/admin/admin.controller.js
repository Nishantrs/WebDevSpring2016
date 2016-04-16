/**
 * Created by NishantRatnakar on 3/1/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $filter)
    {

        //var vm = this;
        //
        //vm.remove = remove;
        //vm.update = update;
        //vm.add    = add;
        //vm.select = select;
        //
        //function init()
        //{
        //    UserService
        //        .findAllUsers()
        //        .then(handleSuccess, handleError);
        //}
        //init();
        //
        //function remove(user)
        //{
        //
        //    //code to check whether someone removes himself!!!!
        //    UserService
        //        .deleteUserById(user._id)
        //        .then(handleSuccess, handleError);
        //
        //    //expecting users in return
        //}
        //
        //function update(user)
        //{
        //    UserService
        //        .editUser(user._id, user)
        //        .then(handleSuccess, handleError);
        //}
        //
        //function add(user)
        //{
        //    UserService
        //        .createUser(user)
        //        .then(handleSuccess, handleError);
        //}
        //
        //function select(user)
        //{
        //    vm.user = angular.copy(user);
        //}
        //
        //function handleSuccess(response)
        //{
        //    vm.users = response.data;
        //}
        //
        //function handleError(error)
        //{
        //    vm.error = error;
        //}

        var vm = this;
        var orderBy = $filter('orderBy');
        vm.message = null;
        vm.predicate = 'username';
        vm.reverse = false;

        function init(){
            UserService
                .findAllUsers()
                .then(
                    function(response){
                        vm.users = response.data;
                        refreshSort();
                        console.log(vm.users);
                    },
                    function(err){
                        console.log(err);
                    }
                );
            unselectUser();

        }
        init();

        vm.user = null;
        vm.selectedUser = null;

        //functions
        vm.addUser = addUser;
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
                                //init();
                                vm.users = response.data;
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

        function addUser(user){
            if(user && user.username && user.password){
                if(user.roles && user.roles.length > 1) {
                    user.roles = user.roles.split(",");
                } else {
                    user.roles = ["student"];
                }
                UserService
                    .createUser(user)
                    .then(function(response){
                        //init();
                        vm.users = response.data;
                    }, function(err){
                            console.log(err);
                        });
            }else{
                vm.message = "Please provide user credentials properly";
            }
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
                        //init();
                        vm.users = response.data;
                    });
            }else{
                vm.message = "Please provide user credentials properly";
            }
        }
    }

})();
