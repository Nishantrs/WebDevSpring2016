/**
 * Created by NishantRatnakar on 3/4/2016.
 */


"use strict";

(function(){

    angular
        .module("HotelReview")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $scope, $rootScope){

        $scope.pmessage = null;

    }



})();