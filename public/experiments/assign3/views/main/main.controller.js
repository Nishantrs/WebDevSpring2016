/**
 * Created by NishantRatnakar on 2/27/2016.
 */

"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($location, $scope){

        $scope.$location=$location;
    }

})();