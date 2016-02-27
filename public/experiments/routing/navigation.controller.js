/**
 * Created by NishantRatnakar on 2/27/2016.
 */


(function(){

    angular
        .module("MovieApp")
        .controller("NavController", NavController)

    function NavController($location, $scope){
       $scope.$location=$location;
    }

})();