/**
 * Created by NishantRatnakar on 3/16/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider){

        $routeProvider
            .when("/home",{
                templateUrl:"views/home/home.view.html",
                controller: "HomeController"
                //resolve: {
                //    getLoggedIn: getLoggedIn
                //}
            })
            .when("/profile/:id",{
                templateUrl:"views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
                //resolve: {
                //    checkLoggedIn: checkLoggedIn
                //}
            }) //placeholders required
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl:"views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login",{
                templateUrl:"views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/forms",{
                templateUrl:"views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/fields",{
                templateUrl:"views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model"
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    //function getLoggedIn(UserService, $q)
    //{
    //    var deferred = $q.defer();
    //
    //    UserService
    //    .getCurrentUser()
    //    .then(function(response)
    //    {
    //        var currentUser = response.data;
    //        UserService.setCurrentUser(currentUser);
    //        deferred.resolve();
    //    });
    //
    //    return deferred.promise;
    //
    //
    //}
    //
    //function checkLoggedIn(UserService, $q, $location){
    //
    //    var deferred = $q.defer();
    //
    //    UserService
    //        .getCurrentUser()
    //        .then(function(response)
    //        {
    //            var currentUser = response.data;
    //            if(currentUser) {
    //                UserService.setCurrentUser(currentUser);
    //                deferred.resolve();
    //            }else{
    //                deferred.reject();
    //                $location.path("/home");
    //
    //            }
    //        });
    //
    //    return deferred.promise;
    //}
})();