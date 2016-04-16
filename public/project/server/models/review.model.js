/**
 * Created by NishantRatnakar on 4/7/2016.
 */

var q = require("q");

"use strict";


module.exports = function (db, mongoose, ReviewSchema) {

    var Review = mongoose.model("ReviewModel", ReviewSchema);

    var api =
    {
        createReview: createReview,
        findAllReviews: findAllReviews,
        findReviewById: findReviewById,
        findReviewsForUser: findReviewsForUser,
        findReviewsForHotel: findReviewsForHotel,
        updateReviewById: updateReviewById,
        deleteReviewById: deleteReviewById,
        deleteReviewByUserId: deleteReviewByUserId

    };
    return api;


    function createReview(newReview)
    {

        //console.log(".....................................................");
        //console.log("In Model createReview");

        newReview.likes = 0;
        newReview.unlikes = 0;

        var deferred = q.defer();

        //console.log(".....................................................");
        //console.log("In Model createReview....after adding parameters");
        //console.log(newReview);

        Review.create(newReview, function(err, doc){
            if (err)
            {
                console.log(".....................................................");
                console.log("In Model createReview....unsuccessful creation of review");
                deferred.reject (err);
            }
            else
            {
                //console.log(".....................................................");
                //console.log("In Model createReview....successful creation of review");
                //console.log(doc);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }

    function findAllReviews()
    {
        console.log(".....................................................");
        console.log("In Model findAllReviews");

        var deferred = q.defer();

        Review.find({},function(err, reviews)
        {
            if(!err)
            {
                console.log(".....................................................");
                console.log("In Model findAllReviews....unsuccessful");
                deferred.resolve(reviews);
            }
            else
            {
                console.log(".....................................................");
                console.log("In Model findAllReviews.....successful");
                deferred.reject(err);
            }
        });

        return deferred.promise;


    }

    function findReviewById(reviewId)
    {
        var deferred = q.defer();

        console.log(".....................................................");
        console.log("In Model findReviewById");

        Review
            .findOne({_id: reviewId}, //findById(userId,...
                function(err, review)
                {
                    if (err)
                    {
                        console.log(".....................................................");
                        console.log("In Model findReviewById......unsuccessful");
                        deferred.reject (err);
                    }
                    else
                    {
                        console.log(".....................................................");
                        console.log("In Model findReviewById.......successful");
                        console.log(review);
                        deferred.resolve (review);
                    }
                });

        return deferred.promise;

    }

    function findReviewsForUser(userId)
    {
        var deferred = q.defer();

        //console.log(".....................................................");
        //console.log("In Model findReviewsForUser");

        Review
            .find({userId: userId},
                function(err, reviews)
                {
                    if (err)
                    {
                        console.log(".....................................................");
                        console.log("In Model findReviewsForUser.......unsuccessful");
                        deferred.reject (err);
                    }
                    else
                    {
                        //console.log(".....................................................");
                        //console.log("In Model findReviewsForUser.......successful");
                        //console.log(reviews);
                        deferred.resolve (reviews);
                    }
                });

        return deferred.promise;
    }

    function findReviewsForHotel(hotelId)
    {
        var deferred = q.defer();

        //console.log(".....................................................");
        //console.log("In Model findReviewsForHotel");

        Review
            .find({hotelId: hotelId},
                function(err, reviews)
                {
                    if (err)
                    {
                        //console.log(".....................................................");
                        //console.log("In Model findReviewsForHotel.......unsuccessful");
                        deferred.reject (err);
                    }
                    else
                    {
                        //console.log(".....................................................");
                        //console.log("In Model findReviewsForHotel.......successful");
                        //console.log(reviews);
                        deferred.resolve (reviews);
                    }
                });

        return deferred.promise;

    }

    function updateReviewById(reviewId, review)
    {
        var deferred = q.defer();

        //console.log(".....................................................");
        //console.log("In Model updateReviewById");

        Review
            .findByIdAndUpdate(reviewId,
                {$set:{comment:review.comment,
                       rating:review.rating,
                       likes:review.likes,
                       unlikes:review.unlikes}},
                function(err , stats)
                {
                    if(stats)
                    {
                        //console.log(".....................................................");
                        //console.log("In Model updateReviewById.....update successful");

                        Review
                            .findById(reviewId,
                                function(err , review){
                                    if (err)
                                    {
                                        console.log(".....................................................");
                                        console.log("In Model updateReviewById.....cannot find review after update");
                                        deferred.reject (err);
                                    }
                                    else
                                    {
                                        //console.log(".....................................................");
                                        //console.log("In Model updateReviewById.....user after update");
                                        //console.log(review);
                                        deferred.resolve(review);
                                    }
                                });
                    }
                    else
                    {
                        console.log(".....................................................");
                        console.log("In Model updateReviewById.....update unsuccessful");
                        deferred.reject(err);
                    }
                });

        return deferred.promise;
    }


    function deleteReviewById(reviewId)
    {
        var deferred = q.defer();

        console.log(".....................................................");
        console.log("In Model deleteReviewById");

        Review
            .remove({_id: reviewId},
                function(err, stats)
                {
                    if (err)
                    {
                        console.log(".....................................................");
                        console.log("In Model deleteReviewById.......delete unsuccessful");
                        deferred.reject (err);
                    }
                    else
                    {
                        console.log(".....................................................");
                        console.log("In Model deleteReviewById.......delete successful");
                        deferred.resolve (stats);
                    }
                }
            );

        return deferred.promise;

    }

    function deleteReviewByUserId(userId)
    {
        var deferred = q.defer();

        console.log(".....................................................");
        console.log("In Model deleteReviewByUserId");

        Review
            .remove({userId: userId},
                function(err, stats)
                {
                    if (err)
                    {
                        console.log(".....................................................");
                        console.log("In Model deleteReviewByUserId.......delete unsuccessful");
                        deferred.reject (err);
                    }
                    else
                    {
                        console.log(".....................................................");
                        console.log("In Model deleteReviewByUserId.......delete successful");
                        deferred.resolve (stats);
                    }
                }
            );

        return deferred.promise;

    }

};
