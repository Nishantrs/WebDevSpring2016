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
            }) //placeholders required
            //.when("/admin", {
            //    templateUrl: "views/admin/admin.view.html",
            //    controller: "AdminController"
            //})

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
                controller: "LoginController"
            })
            .when("/reviews",{
                templateUrl:"views/reviews/reviews.view.html",
                controller: "ReviewsController",
                controllerAs: "model"
            })
            .when("/profile/:userId/reviews",{
                templateUrl:"views/reviews/reviews.view.html",
                controller: "ReviewsController",
                controllerAs: "model"
            })
            .when("/profile/:userId/reviews/:reviewId",{
                templateUrl:"views/reviews/review-details.view.html",
                controller: "ReviewDetailsController",
                controllerAs: "model"
            })
            //.when("/username", {
            //    templateUrl: "views/profile/profile.view.html"
            //})
            //.when("/forms",{
            //    templateUrl:"views/forms/forms.view.html",
            //    controller: "FormController"
            //})
            //.when("/form-fields",{
            //    templateUrl:"views/forms/form-fields.view.html",
            //    controller: "FormFieldsController"
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
    }
})();