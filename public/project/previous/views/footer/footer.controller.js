/**
 * Created by NishantRatnakar on 3/3/2016.
 */


(function(){

    angular
        .module("HotelReview")
        .controller("FooterController", FooterController);

    function FooterController($location, $scope, $rootScope){

        $scope.$location=$location;

    }

})();