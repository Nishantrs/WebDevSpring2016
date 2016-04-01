/**
 * Created by NishantRatnakar on 2/28/2016.
 */
"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, $scope){

        console.log("In sidebar controller");
        $scope.$location=$location;
    }

})();