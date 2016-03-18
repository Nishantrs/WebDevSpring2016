/**
 * Created by NishantRatnakar on 3/15/2016.
 */


(function(){

    angular
    .module("WhiteBoardApp")
    .factory("CourseService",courseService);

    function courseService($http){

        console.log("In service");

        var service = {createCourse : createCourse,
        readAllCourses : readAllCourses,
        readCourseById: readCourseById,
        deleteCourseById: deleteCourseById,
        updateCourseById: updateCourseById
        };

        return service;

        //Ajax is used to get request in the backend asynchronously.
        function readAllCourses(callback)
        {
            $http.get("/rest/course")
                .success(callback);
        }

        function createCourse()
        {}

        function readCourseById(id, callback)
        {
            $http.get("/rest/course/" + id)
                .success(callback);

        }

        function deleteCourseById()
        {}

        function updateCourseById()
        {}

    }
})();