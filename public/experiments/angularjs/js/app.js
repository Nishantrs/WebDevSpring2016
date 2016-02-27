/**
 * Created by NishantRatnakar on 2/21/2016.
 */

(function(){

    angular
        .module("MovieDBApp",[])
        .controller("MovieListController",MovieListController);

    function MovieListController($scope){

        var mymovies = [
            {id: 123, title:"Avatar", year:2007},
            {id: 253, title:"golmaal", year:2001}
        ];


        //Event Handler
        $scope.movies = mymovies;
        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        function addMovie(m){
            console.log(m);
            var newMymovies =
            {id: m.id,
                title: m.title,
                year: m.year
        };
            $scope.movies.push(newMymovies);
            $scope.m = {};
            console.log(mymovies);
        }



        function deleteMovie(index){
           $scope.movies.splice(index,1);

            //deleteMovie(m)
            //var index = $scope.movies.indexOf(m);
            console.log(mymovies);
        }

        function selectMovie(p){
            //$scope.m=p;
            // m is name of input field

            $scope.selectedMovieIndex = $scope.movies.indexOf(p);
            $scope.m = {
                id: p.id,
                title: p.title,
                year: p.year
            };
        }

        function updateMovie(p){
            $scope.movies[$scope.selectedMovieIndex] = {
                id: p.id,
                title: p.title,
                year: p.year
            };
        }

    }

})();
