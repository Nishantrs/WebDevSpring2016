/**
 * Created by NishantRatnakar on 2/27/2016.
 */


(function(){

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope){

        $scope.$location=$location;

        $scope.logout = logout;

        function logout()
        {
                $rootScope.currentUser = null;
                $location.url("/home")

        }


    }

})();
