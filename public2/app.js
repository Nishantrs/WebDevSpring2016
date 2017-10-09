/**
 * Created by NishantRatnakar on 3/13/2016.
 */

(function(){

    angular
        .module("WhiteBoardApp",[])
        .controller("CourseController",courseController);

    function courseController($scope, $http, CourseService)
    {
        console.log("In controller.");
        //if error in js file, page wont render properly.

        $scope.hello = "Hello from CC";


        CourseService.readAllCourses(renderCourses);

        console.log("received service response.");

        function renderCourses(response)
        {
            $scope.courses = response;

        }

        $scope.selectCourse = selectCourse;

        function selectCourse(index)
        {
            $scope.selectedCourseIndex = index;
            CourseService.readCourseById(index, renderCourse);
        }

        function renderCourse(response)
        {
            $scope.course = response;
        }

    }

    //improper service definition which includes IIFE leads to injector error.

})();