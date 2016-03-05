/**
 * Created by NishantRatnakar on 3/4/2016.
 */



"use strict";

(function(){

    angular
        .module("HotelReview")
        .controller("LoginController", LoginController);

    function LoginController($location, $scope, $rootScope){

        $scope.pmessage = null;

    }



})();