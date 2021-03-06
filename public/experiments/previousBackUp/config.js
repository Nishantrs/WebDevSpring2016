/**
 * Created by NishantRatnakar on 2/27/2016.
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

            })
            .when("/profile",{
                templateUrl:"views/users/profile.view.html",
                controller: "ProfileController"
            }) //placeholders required
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/register",{
                templateUrl:"views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login",{
                templateUrl:"views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/forms",{
                templateUrl:"views/forms/forms.view.html",
                controller: "FormController"
            })
            .when("/form-fields",{
                templateUrl:"views/forms/form-fields.view.html",
                controller: "FormFieldsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();