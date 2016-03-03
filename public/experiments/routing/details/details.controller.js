/**
 * Created by NishantRatnakar on 2/27/2016.
 */


(function(){

    angular
        .module("MovieApp")
        .controller("DetailsController", detailsController);

    function detailsController($scope, $routeParams, $http){

        var imdbID = $routeParams.imdbID; //imdbID is the parameter used in config.js

        $http.get("http://www.omdbapi.com/?i="+imdbID)
            .success(renderMovie);

        function renderMovie(response){
            $scope.movie = response; //movie is the variable used in details.view.html

        }
    }
})();