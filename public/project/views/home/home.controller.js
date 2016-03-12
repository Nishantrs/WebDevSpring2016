/**
 * Created by NishantRatnakar on 3/3/2016.
 */

"use strict";

(function() {

    angular.module("HotelReview")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $routeParams, $location, SearchService, $http) {

        var model = this;
        $scope.search = search;

        //function search(data)
        //{
        //    console.log("In controller");
        //    console.log("This is query:" + data.query);
        //    console.log("This is city:" + data.city);
        //    SearchService.searchByTermAndPlace(data.query, data.city,0);
        //}

        //function init()
        //{
        //    angular.element(document).ready(function () {
        //
        //        $http.get("http://ipinfo.io", function(res) {
        //
        //            if (res !== undefined) {
        //                model.searchData.city = res.city;
        //            } else {
        //                ////console.log("not supported");
        //                //set default location
        //                model.searchData.city = 'Boston';
        //            }
        //        });
        //
        //    });
        //
        //}
        //
        //init();



        function search(data)
        {

            console.log("In home controller");

            //$http.get("http://ipinfo.io", function(res)
            //{
            //    console.log(res);
            //});

            if (data=== undefined) //(data.query === undefined && data.city === undefined)
                {
                alert("Enter valid value to search");
                }
            else if(data.query === undefined)
                {
                alert("Enter valid cuisine");
                }
            else if(data.city === undefined)
                {
                alert("Enter valid city");
                }
            else
                {
                var current = data.query;
                var place = data.city;

                console.log("This is query:" + data.query);
                console.log("This is city:" + data.city);

                if (current !== undefined && place === undefined)
                {
                    $location.path("/search/type/" + current);
                } else if (current === undefined && place !== undefined)
                {
                    $location.path("/search/place/" + place);
                } else
                {
                    $location.path("/search/type/" + current + "/place/" + place);
                }
            }
        }

    }

})();