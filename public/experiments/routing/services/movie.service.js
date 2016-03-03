/**
 * Created by NishantRatnakar on 2/27/2016.
 */


(function(){

    angular
        .module("MovieApp")
        .factory("MovieService", movieService);


    function movieService($http){

        var api = {
            findMoviesByTitle: findMoviesByTitle,
            findMoviesByImdbId: findMoviesByImdbId
        };

        return api;

        function findMoviesByTitle(title,callback){

            $http.get("http://www.omdbapi.com/?s="+title)
                .success(callback);
        }

        function findMoviesByImdbId(imdbId){

        }
    }

})();