/**
 * Created by NishantRatnakar on 2/27/2016.
 */


(function(){

    angular
        .module("HotelReview")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService)
    {

        $scope.$location=$location;

        $scope.logout = logout;

        function logout()
        {
            console.log("In header controller logout function");

            UserService
            .logout()
            .then(function(response)
            {
                var reply = response.data;

                if(reply)
                {
                    console.log("In header controller after returning");
                    UserService.setCurrentUser(null);
                    UserService.userLogged(false);
                    $location.url("/home")
                }

            });

        }

    }

})();
