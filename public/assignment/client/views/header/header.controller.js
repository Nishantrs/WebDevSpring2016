/**
 * Created by NishantRatnakar on 2/27/2016.
 */


(function(){

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService){

        var vm = this;

        vm.logout = logout;

        function init()
        {
            //console.log("In Header Controller");

            vm.$location = $location;
        }

        init();

        function logout()
        {
            //console.log("In Header Controller...logout");
            UserService
                .logout()
                .then(function() {
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }


    }

})();
