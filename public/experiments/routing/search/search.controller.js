/**
 * Created by NishantRatnakar on 2/27/2016.
 */


(function(){

    angular
        .module("MovieApp")
        .controller("SearchController", searchController)

    function searchController($scope, $http, $routeParams, $location, MovieService){

        var title = $routeParams.title;  //the variable used in config.js

        if(title)
        {search(title);
        }

        // Event handlers declaration
        $scope.search=search;


        //Event Handlers implementation
        function search(title){

            console.log(title);
            $location.url("/search/"+title)
            //$http.get("http://www.omdbapi.com/?s="+title)
            //      .success(render);
            MovieService.findMoviesByTitle(title, render);
        }

        function render(response){
            console.log(response);
            $scope.data = response;
        }

    }
})();
