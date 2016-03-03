/**
 * Created by NishantRatnakar on 3/1/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);


    function HomeController($location, $scope, $rootScope)
    {
        if ($rootScope.currentUser == null)
        {
            $rootScope.currentUser = null;
        }
    }

})();