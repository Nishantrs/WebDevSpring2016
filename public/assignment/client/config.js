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
                controller: "HomeController",
                resolve: {
                    checkCurrentUser: checkCurrentUser
                }
            })
            .when("/profile",{
                templateUrl:"views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/profile/:id",{
                templateUrl:"views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
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
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/fields",{
                templateUrl:"views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/user/loggedin').success(function(user)
        {
            // User is Authenticated
            if (user !== '0') //user !== 0 to be used in passport js.
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                alert("You need to log in.");
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/user/loggedin').success(function(user)
        {
            // User is Authenticated
            if (user !== '0') //user !== 0 to be used in passport js.
            {
                $rootScope.currentUser = user;

            }

            deferred.resolve();
        });

        return deferred.promise;
    };

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/user/loggedin').success(function(user)
        {

            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') > -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            else
            {
                alert("You need to log in.");
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };
})();