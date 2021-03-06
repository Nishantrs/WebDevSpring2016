/**
 * Created by NishantRatnakar on 3/3/2016.
 */

(function() {
    "use strict";
    angular.module("HotelReview")
        .controller("SearchController", SearchController);

    function SearchController($scope, $rootScope, $routeParams, $location, SearchService, RestaurantService) {

        var model = this;

        model.goHome = goHome;
        model.viewRestaurant = viewRestaurant;

        model.$location = $location;



        function goHome()
        {
            $location.path("/home");
        }


        function init() {

            //console.log("In search control");

            model.data = $routeParams.data;
            model.place = $routeParams.place;

            //console.log(model.data);
            //console.log(model.place);

            if (model.data !== undefined && model.place !== undefined) {

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
            else if(model.data == undefined)
            {
                SearchService.searchByTermAndPlace('food', model.place, 0, render);
            }
            else
            {
                SearchService.searchByTermAndPlace(model.data, 'Boston', 0, render);
            }

            function render(resp)
            {
                //console.log("In search controller...in render");
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

        function viewRestaurant(restaurantId)
        {
            console.log("In search controller...view controller");

            if (restaurantId)
            {
                $location.path("/restaurant/"+restaurantId)
            }
            else
            {
                alert("No further details about the restaurant you are trying to explore!!!");
            }

        }
    }
})();