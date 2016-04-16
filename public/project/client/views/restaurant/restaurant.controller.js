/**
 * Created by NishantRatnakar on 3/31/2016.
 */

(function() {
    "use strict";
    angular.module("HotelReview")
        .controller("RestaurantController", RestaurantController);

    function RestaurantController($scope, $rootScope, $routeParams, $location, SearchService, RestaurantService, ReviewService, UserService) {

        var model = this;

        var restaurantId = $routeParams.restaurantId;

        model.restaurant = null;

        model.isReviews = true;
        model.isFollower = false;
        model.reviews = null;

        model.showReviews = showReviews;
        model.showFollower = showFollower;
        model.addReview = addReview;
        model.upvote = upvote;
        model.downvote = downvote;

        model.$location = $location;



        function init() {

            model.review = {comment:"",rating:""};

            // console.log("In restaurant control");
            // console.log(restaurantId);


            RestaurantService.searchByRestaurantId(restaurantId)
                .then(function(response)
                    {
                        var restaurantData = response;

                        model.restaurant = restaurantData;

                    },
                    function(err)
                    {

                        console.log("In restaurant data not received");
                        console.log(err);
                    });


            ReviewService
                .findReviewsForHotel(restaurantId)
                .then(function(response)
                {
                    //console.log("...................................");
                    //console.log("Restaurant reviews response received");
                    //console.log(response);
                    //console.log(response.data);

                    var reviews = response.data;

                    if(reviews.length)
                    {
                        model.reviews = reviews;
                    }
                    else
                    {
                        model.reviews = null;
                    }


                },function(err)
                {
                    alert("Unable to find reviews for particular hotel");
                    console.log(err);
                })


        }
        init();

        function addReview(review)
        {
            /* use resId,userId and review body to add review*/

            if(!review.comment)
            {
                alert("Please enter comment!");
                return;
            }
            else if(!review.rating)
            {
                alert("Please enter rating!");
                return;
            }
            else
            {
                UserService
                    .getCurrentUser()
                    .then(function(response)
                    {
                        //console.log(response.data);
                        var user = response.data;

                        if(user)
                        {

                            var alreadyReviewed = false;

                            var hotelList = user.reviewedFor;

                            for (var i = 0; i < hotelList.length; i++)
                            {

                                if (hotelList[i].hotelId == restaurantId)
                                {
                                    alreadyReviewed = true;
                                    break;
                                }

                            }

                            if(alreadyReviewed)
                            {
                                alert("You have already reviewed for this hotel!!!");
                                init();
                            }
                            else
                            {
                                var reviewObj = review;

                                reviewObj.rating = ratingConversion(review.rating);

                                reviewObj.userId = user._id;
                                reviewObj.username = user.username;
                                reviewObj.hotelId = restaurantId;
                                reviewObj.hotelname = model.restaurant.name;
                                reviewObj.likes = 0;
                                reviewObj.unlikes = 0;

                                ReviewService
                                    .createReview(reviewObj)
                                    .then(function(response)
                                    {

                                        var review = response.data;

                                        //console.log("...................................");
                                        //console.log("review created");
                                        //console.log(review);

                                        var hotelId = {hotelId:restaurantId};

                                        var updatedUser = user;

                                        updatedUser.reviewedFor.push(hotelId);

                                        UserService
                                            .updateUser(user._id,updatedUser)
                                            .then(function(response)
                                            {
                                                var userReviewed = response.data;

                                                //console.log("...................................");
                                                //console.log("userReviewed updated");
                                                //console.log(userReviewed);

                                                if(userReviewed)
                                                {
                                                    init();
                                                }
                                                else
                                                {
                                                    console.log("Cannot update user with hotelId");
                                                }
                                            },function(err)
                                            {
                                                console.log("...................................");
                                                console.log("Error of update user with hotelId");
                                                console.log(err);
                                            });
                                    },function(err)
                                    {
                                        console.log("...................................");
                                        console.log("Error of create review");
                                        console.log(err);
                                    });
                            }

                        }
                        else
                        {
                            alert("You need to login to review!!!");
                            $location.path("/login");
                        }
                    },function(err)
                    {
                        console.log("...................................");
                        console.log("Error of finding currentUser");
                        console.log(err);
                    });
            }

        }

        function upvote(review)
        {

                UserService
                    .getCurrentUser()
                    .then(function(response)
                    {
                        //console.log(response.data);
                        var user = response.data;

                        if(user)
                        {

                            var alreadyVoted = false;

                            var reviewList = user.votedFor;

                            for (var i = 0; i < reviewList.length; i++)
                            {

                                if (reviewList[i].reviewId == review._id)
                                {
                                    alreadyVoted = true;
                                    break;
                                }

                            }

                            if(alreadyVoted)
                            {
                                alert("You have already voted for this review!!!");
                                init();
                            }
                            else
                            {
                                var reviewObj = review;

                                reviewObj.likes = review.likes + 1;

                                ReviewService
                                    .updateReviewById(review._id,reviewObj)
                                    .then(function(response)
                                    {

                                        var review = response.data;

                                        //console.log("...................................");
                                        //console.log("review upvote updated");
                                        //console.log(review);

                                        var reviewId = {reviewId:review._id};

                                        var updatedUser = user;

                                        updatedUser.votedFor.push(reviewId);

                                        UserService
                                            .updateUser(user._id,updatedUser)
                                            .then(function(response)
                                            {
                                                var userVoted = response.data;

                                                //console.log("...................................");
                                                //console.log("userVoted updated");
                                                //console.log(userVoted);

                                                if(userVoted)
                                                {
                                                    init();
                                                }
                                                else
                                                {
                                                    console.log("Cannot update user with reviewId");
                                                }
                                            },function(err)
                                            {
                                                console.log("...................................");
                                                console.log("Error of update user with reviewId");
                                                console.log(err);
                                            });
                                    },function(err)
                                    {
                                        console.log("...................................");
                                        console.log("Error of update upvote review");
                                        console.log(err);
                                    });
                            }

                        }
                        else
                        {
                            alert("You need to login to vote!!!");
                            $location.path("/login");
                        }
                    },function(err)
                    {
                        console.log("...................................");
                        console.log("Error of finding currentUser");
                        console.log(err);
                    });


        }


        function downvote(review)
        {

            UserService
                .getCurrentUser()
                .then(function(response)
                {
                    //console.log(response.data);
                    var user = response.data;

                    if(user)
                    {

                        var alreadyVoted = false;

                        var reviewList = user.votedFor;

                        for (var i = 0; i < reviewList.length; i++)
                        {

                            if (reviewList[i].reviewId == review._id)
                            {
                                alreadyVoted = true;
                                break;
                            }

                        }

                        if(alreadyVoted)
                        {
                            alert("You have already voted for this review!!!");
                            init();
                        }
                        else
                        {
                            var reviewObj = review;

                            reviewObj.unlikes = review.unlikes + 1;

                            ReviewService
                                .updateReviewById(review._id,reviewObj)
                                .then(function(response)
                                {

                                    var review = response.data;

                                    //console.log("...................................");
                                    //console.log("review downvote updated");
                                    //console.log(review);

                                    var reviewId = {reviewId:review._id};

                                    var updatedUser = user;

                                    updatedUser.votedFor.push(reviewId);

                                    UserService
                                        .updateUser(user._id,updatedUser)
                                        .then(function(response)
                                        {
                                            var userVoted = response.data;

                                            //console.log("...................................");
                                            //console.log("userVoted updated");
                                            //console.log(userVoted);

                                            if(userVoted)
                                            {
                                                init();
                                            }
                                            else
                                            {
                                                console.log("Cannot update user with reviewId");
                                            }
                                        },function(err)
                                        {
                                            console.log("...................................");
                                            console.log("Error of update user with reviewId");
                                            console.log(err);
                                        });
                                },function(err)
                                {
                                    console.log("...................................");
                                    console.log("Error of update downvote review");
                                    console.log(err);
                                });
                        }

                    }
                    else
                    {
                        alert("You need to login to vote!!!");
                        $location.path("/login");
                    }
                },function(err)
                {
                    console.log("...................................");
                    console.log("Error of finding currentUser");
                    console.log(err);
                });


        }

        function ratingConversion(value)
        {
            if(value == "0(forgetful)")
            {
                return 0;
            }
            else if(value == "1(bad)")
            {
                return 1;
            }
            else if(value == "2(Average)")
            {
                return 2;
            }
            else if(value == "3(Good)")
            {
                return 3;
            }
            else if(value == "4(Amazing)")
            {
                return 4;
            }
            else (value == "5(The Best!!!)")
            {
                return 5;
            }
        }

        function showReviews()
        {
            model.isReviews = true;
            model.isFollower = false;
        }

        function showFollower()
        {
            model.isReviews = false;
            model.isFollower = true;
        }
    }
})();