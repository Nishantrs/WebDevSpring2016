/**
 * Created by NishantRatnakar on 3/3/2016.
 */

"use strict";

(function() {

    angular
        .module("HotelReview")
        //.directive(currentPosition, function() {
        //
        //    var start = null;
        //    var end = null;
        //
        //    function link(scope) {
        //
        //
        //        $(element).sortable({
        //            axis: jgaAxis,
        //            start: function(event, ui) {
        //                start = ui.item.index();
        //            },
        //            stop: function(event, ui) {
        //                end = ui.item.index();
        //                var fields = scope.model.fields;
        //                var temp = fields[start];
        //                fields[start] = fields[end];
        //                fields[end] = temp;
        //                scope.$apply();
        //            }
        //        });
        //    }
        //
        //    return {
        //        link: link
        //    };
        //})
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $routeParams, $location, SearchService, $http) {

        var model = this;
        model.search = search;
        model.searchData = {city:'', query:''};
        var geocoder;
        geocoder = new google.maps.Geocoder();


        function setPosition(position)
        {
            console.log("In set position");

            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            geocoder
                .geocode({'location': latlng}, function(results, status)
                {
                    if (status == google.maps.GeocoderStatus.OK)
                    {
                        if (results.length > 1)
                        {
                            console.log(results);
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
                                        console.log("finding the best match for locality");
                                        console.log(best[i].long_name);
                                        model.searchData.city = best[i].long_name;
                                        $scope.$apply();
                                        console.log(model.searchData.city);
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

            //$http.get("http://ipinfo.io")
            //    .success(function(res) {
            //        console.log ( res);
            //        if (typeof res !== "undefined") {
            //            model.searchData.city = res.city;
            //        } else {
            //            ////console.log("not supported");
            //            //set default location
            //            model.searchData.city = 'Boston';
            //        }
            //    });

           // navigator.geolocation.getCurrentPosition(setPosition);

            angular.element(document).ready(function ()
            {
                console.log("In Geolocation section");

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

            console.log("In home controller");
            console.log(data);

            if (!data) //(data.query === undefined && data.city === undefined)
            {
                alert("Enter valid value to search");
            }
            else if(!data.query)
            {
                alert("Enter valid cuisine");
            }
            else if(!data.city)
            {
                alert("Enter valid city");
            }
            else
            {
                var current = data.query;
                var place = data.city;

                console.log("This is query:" + data.query);
                console.log("This is city:" + data.city);

                if (typeof current !== undefined && typeof place == undefined)
                {
                    $location.path("/search/type/" + current);
                } else if (typeof current == undefined && typeof place !== undefined)
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