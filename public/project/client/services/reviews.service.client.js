/**
 * Created by NishantRatnakar on 3/9/2016.
 */


(function(){

    angular.module("HotelReview")
        .factory("ReviewService", ReviewService);


    function ReviewService(){

        var reviews = [];

        reviews =
            [
                {"_id": "000", "title": "Taiwan Café", "userId": 123, "comment":"It is a good place TC.","hotelId":"taiwan-café-boston-2", "username": "alice", "likes": [], "unlikes": []},
                {"_id": "010", "title": "Chef Chang's on Back Bay", "userId": 123, comment:"It is a good place CCBB.", "hotelId":"chef-changs-on-back-bay-boston", "username": "alice", "likes": [], "unlikes": []},
                {"_id": "020", "title": "New Dong Khanh", "userId": 234, comment:"It is a good place NDK.", "hotelId":"new-dong-khanh-boston", "username": "bob", "likes": [], "unlikes": []}
            ];

        //Function declarations
        var api = {

            createReviewForUser: createReviewForUser, //temporary fix
            findAllReviewsForUser: findAllReviewsForUser,
            findAllReviewsForHotel: findAllReviewsForHotel,
            deleteReviewById: deleteReviewById,
            updateReviewById: updateReviewById,
            deleteReviewByUserId: deleteReviewByUserId,
            findAllReviews: findAllReviews,
            findReviewById: findReviewById
                };

        return api;

        //Function implementation
        function createReviewForUser(uid, review, callback)
        {
            review._id = (new Date).getTime();
            review.userId = uid;
            reviews.push(review);
            callback(review);
        }

        function findAllReviewsForUser(userId, callback)
        {
            var userReviews = [];

            for (var i=0; i < reviews.length; i++)
            {
                if (reviews[i].userId == userId)
                {
                    userReviews.push(reviews[i]);
                }
            }
            callback(userReviews);
        }

        function findAllReviewsForHotel(hotelId, callback)
        {
            var userReviews = [];

            for (var i=0; i < reviews.length; i++)
            {
                if (reviews[i].hotelId == hotelId)
                {
                    userReviews.push(reviews[i]);
                }
            }
            callback(userReviews);
        }

        function deleteReviewById(reviewId, callback)
        {
            for(var i=0; i < reviews.length; i++)
            {
                if(reviews[i]._id == reviewId)
                {
                    reviews.splice(i,1);
                    break;
                }
            }
            callback(reviews);
        }

        function findReviewById(reviewId, callback)
        {
            for(var i=0; i < reviews.length; i++)
            {
                if(reviews[i]._id == reviewId)
                {
                    callback(reviews[i]);
                    break;
                }
            }

        }

        function updateReviewById(reviewId, newReview, callback)
        {
            for(var i=0; i < reviews.length; i++)
            {
                if(reviews[i]._id == reviewId)
                {
                    reviews[i] = newReview;
                    callback(reviews[i]);
                    break;
                }
            }

        }


        function deleteReviewByUserId(userId, callback)
        {
            for(var i=0; i < reviews.length; i++)
            {
                if(reviews[i].userId == userId)
                {
                    reviews.splice(i,1);
                    //break;
                }
            }
            callback(reviews);
        }

        function findAllReviews(callback)
        {
            callback(reviews);
        }


    }

})();