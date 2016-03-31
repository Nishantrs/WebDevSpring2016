/**
 * Created by NishantRatnakar on 3/3/2016.
 */

(function() {
    "use strict";
    angular.module("HotelReview")
        .controller("SearchController", SearchController);

    function SearchController($scope, $rootScope, $routeParams, $location, SearchService) {

        var model = this;

        model.goHome = goHome;

        $scope.$location = $location;



        function goHome()
        {
            $location.path("/home");
        }


        function init() {

            console.log("In search control");

            model.data = $routeParams.data;
            model.place = $routeParams.place;

            if (model.data !== undefined && model.place !== undefined) {
                model.display = model.data + " &  " + model.place;

                SearchService.searchByTermAndPlace(model.data, model.place, 0, render);
                    //.then(function(resp) {
                    //    if (resp === undefined) {
                    //        alert("Item you are trying to search could not be found");
                    //        $location.path("/home");
                    //    } else if (resp.businesses.length === 0) {
                    //
                    //        alert("Item you are trying to search could not be found");
                    //        $location.path("/home");
                    //
                    //    } else {
                    //        model.searches = resp.businesses;
                    //    }
                    //
                    //});


            }

            function render(resp)
            {
                console.log("In search controller...in render");
                console.log(resp);
                if (resp === undefined)
                {
                            alert("Item you are trying to search could not be found");
                            $location.path("/home");
                }
                else if (resp.businesses.length === 0)
                {
                            alert("Item you are trying to search could not be found");
                            $location.path("/home");
                }
                else
                {
                            model.searches = resp.businesses;
                }
            }

        }
        init();
    }
})();