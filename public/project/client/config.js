/**
 * Created by NishantRatnakar on 3/3/2016.
 */

"use strict";

(function(){

    angular
        .module("HotelReview")
        .config(configuration);

    function configuration($routeProvider){

        $routeProvider
            .when("/home",{
                templateUrl:"views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl:"views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/profile/:userId", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
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
            //.when("/reviews",{
            //    templateUrl:"views/reviews/reviews.view.html",
            //    controller: "ReviewsController",
            //    controllerAs: "model"
            //})
            //.when("/profile/:userId/reviews",{
            //    templateUrl:"views/reviews/reviews.view.html",
            //    controller: "ReviewsController",
            //    controllerAs: "model"
            //})
            //.when("/profile/:userId/reviews/:reviewId",{
            //    templateUrl:"views/reviews/review-details.view.html",
            //    controller: "ReviewDetailsController",
            //    controllerAs: "model"
            //})
            .when("/search/type/:data", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/search/place/:place", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"

            })
            .when("/search/type/:data/place/:place", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"

            })
            .otherwise({
                redirectTo: "/home"
            });


        function checkLoggedIn(UserService, $q, $location) {

            var deferred = $q.defer();

            UserService
                .getLoggedinUser()  //change this
                .then(function(response) {
                    var currentUser = response.data;
                    console.log(currentUser);
                    if(currentUser) {
                        UserService.setCurrentUser(currentUser);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/home");
                    }
                });

            return deferred.promise;
        }

        function getLoggedIn(UserService, $q){
            var deferred = $q.defer();

            UserService
                .getLoggedinUser()  //change here
                .then(function(response){
                    var currentUser = response.data;
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                });

            return deferred.promise;
        }
    }
})();