/**
 * Created by NishantRatnakar on 3/3/2016.
 */

"use strict";

(function(){

    angular
        .module("HotelReview")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    checkCurrentUser: checkCurrentUser
                }
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/profile/:userId", {
                templateUrl: "views/users/profile.display.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkCurrentUser: checkCurrentUser
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
            .when("/restaurant/:restaurantId", {
                templateUrl: "views/restaurant/restaurant.view.html",
                controller: "RestaurantController",
                controllerAs: "model",
                resolve: {
                    checkCurrentUser: checkCurrentUser
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/search/type/:data", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    checkCurrentUser: checkCurrentUser
                }
            })
            .when("/search/place/:place", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    checkCurrentUser: checkCurrentUser
                }

            })
            .when("/search/type/:data/place/:place", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    checkCurrentUser: checkCurrentUser
                }

            })
            .otherwise({
                redirectTo: "/home"
            });

    }

        var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/project/loggedin').success(function(user)
            {
                // User is Authenticated
                if (user) //user !== '0' to be used in passport js.
                {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
                // User is Not Authenticated
                else
                {
                    $location.url('/login');
                    alert("You need to log in.");
                    deferred.reject();
                }
            });

            return deferred.promise;
        };

        var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/project/loggedin').success(function(user)
            {
                // User is Authenticated
                if (user) //user !== '0' to be used in passport js.
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

        $http.get('/api/project/loggedin').success(function(user)
        {
            console.log(user);

            // User is Authenticated
            if (user && user.roles.indexOf('admin') != -1) //user !== '0' to be used in passport js.
            {
                $rootScope.isAdminUser = true;
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            else
            {
                alert("You are not authorized.");
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

})();