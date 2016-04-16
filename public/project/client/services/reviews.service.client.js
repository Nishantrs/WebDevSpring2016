/**
 * Created by NishantRatnakar on 3/9/2016.
 */


(function(){

    angular.module("HotelReview")
        .factory("ReviewService", ReviewService);


    function ReviewService($http)
    {

        //Function declarations
        var api = {

            createReview: createReview,
            findReviewsForUser: findReviewsForUser,
            findReviewsForHotel: findReviewsForHotel,
            deleteReviewById: deleteReviewById,
            updateReviewById: updateReviewById,
            deleteReviewByUserId: deleteReviewByUserId,
            findAllReviews: findAllReviews,
            findReviewById: findReviewById

        };

        return api;

        //Function implementation
        function createReview(reviewObj)
        {
            console.log("In Review Services Client....createReview");
            return $http.post("/api/project/review", reviewObj);
        }

        function findReviewsForUser(userId)
        {
            console.log("In Review Services Client....findReviewsForUser");
            return $http.get("/api/project/review?userId=" + userId);
        }

        function findReviewsForHotel(hotelId)
        {
            console.log("In Review Services Client....findReviewsForHotel");
            return $http.get("/api/project/review?hotelId=" + hotelId);
        }

        function deleteReviewById(reviewId)
        {
            console.log("In Review Services Client....deleteReviewById");
            return $http.delete("/api/project/review?reviewId=" + reviewId);
        }

        function findReviewById(reviewId)
        {
            console.log("In Review Services Client....findReviewById");
            return $http.get("/api/project/review?reviewId=" + reviewId);
        }

        function updateReviewById(reviewId, newReview)
        {
            console.log("In Review Services Client....updateReviewById");
            return $http.put("/api/project/review/" + reviewId, newReview);
        }


        function deleteReviewByUserId(userId)
        {
            console.log("In Review Services Client....deleteReviewByUserId");
            return $http.delete("/api/project/review?userId=" + userId);
        }

        function findAllReviews()
        {
            console.log("In Review Services Client....findAllReviews");
            return $http.get("/api/project/review");
        }


    }

})();