/**
 * Created by NishantRatnakar on 3/3/2016.
 */

"use strict";

(function() {

    angular
        .module("HotelReview")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $routeParams, $location, SearchService, $http) {

        //console.log("In home controller");

        var model = this;
        model.search = search;
        model.searchData = {city:'', query:''};
        model.cityCheck = cityCheck;

        var geocoder;
        geocoder = new google.maps.Geocoder();


        function setPosition(position)
        {
            //console.log("In set position");

            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            geocoder
                .geocode({'location': latlng}, function(results, status)
                {
                    if (status == google.maps.GeocoderStatus.OK)
                    {
                        if (results.length > 1)
                        {
                            //console.log(results);
                            //get the best match
                            var best = results[0].address_components;
                            var city_found = 0;
                            for (var i = 0; i < best.length; i++)
                            {
                                //loop through types to check if it is a locality
                                for (var j = 0; j < best[i].types.length; j++)
                                {
                                    if (best[i].types[j] == 'locality')
                                    {
                                        //console.log("finding the best match for locality");
                                        //console.log(best[i].long_name);
                                        model.searchData.city = best[i].long_name;
                                        $scope.$apply();
                                        //console.log(model.searchData.city);
                                        city_found = 1;
                                        break;
                                    }
                                }
                                if (city_found == 1)
                                {
                                    break;
                                }
                            }
                        }
                        else
                        {
                            //set default location
                            model.searchData.city = 'Boston';
                            console.log("set Default as unable to get best match");
                        }
                    }
                    else
                    {
                        //set default location
                        model.searchData.city = 'Boston';
                        console.log("Geocoder failed: " + status);
                    }
                });
        }




        function init()
        {

            angular.element(document).ready(function ()
            {
                //console.log("In Geolocation section");

                //Set geolocation
                if (navigator.geolocation)
                {
                    navigator.geolocation.getCurrentPosition(setPosition);
                }
                else
                {
                    console.log("not supported");
                    //set default location
                    model.searchData.city = 'Boston';
                }
            });

        }

        init();


        function search(data)
        {

            //console.log("In home controller");
            console.log(data);


            if (data.query == "" && data.city == "") //(data.query === undefined && data.city === undefined)
            {
                alert("Enter valid details to search");
                init();
            }
            else
            {

                //console.log("In else");

                var current = data.query;
                var place = data.city;
                //
                //console.log("This is query:" + data.query);
                //console.log("This is city:" + data.city);

                if (data.query !== "" && data.city == "")
                {
                    //console.log("No place");
                    $location.path("/search/type/" + current);
                }
                else if (data.query == "" && data.city !== "")
                {
                    //console.log("No cuisine");
                    $location.path("/search/place/" + place);
                }
                else
                {
                    $location.path("/search/type/" + current + "/place/" + place);
                }
            }
        }

        function cityCheck()
        {
            //console.log("In cityCheck!!!!");

            if(!model.searchData.city)
            {
                alert("Please enter the city!!!")
            }
        }

    }

})();