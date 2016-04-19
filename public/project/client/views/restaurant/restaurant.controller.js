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

        var restaurantInstance = null;

        var currentUserInstance = null;

        model.restaurant = null;

        model.isReviews = true;
        model.isFollower = false;
        model.reviews = null;

        model.showReviews = showReviews;
        model.showFollower = showFollower;
        model.addReview = addReview;
        model.upvote = upvote;
        model.downvote = downvote;
        model.restaurantFollow = restaurantFollow;
        model.restaurantUnFollow = restaurantUnFollow;
        model.restaurantFollower = null;
        model.votedAlready = false;
        model.alreadyFollowing = false;



        model.$location = $location;



        function init() {


            model.alreadyFollowing = false;

            model.review = {comment:"",rating:""};

            // console.log("In restaurant control");
            // console.log(restaurantId);


            RestaurantService.searchByRestaurantId(restaurantId)
                .then(function(response)
                    {
                        var restaurantData = response;

                        model.restaurant = restaurantData;

                    },function(err)
                    {

                        console.log("In restaurant data not received");
                        console.log(err);
                    });

            RestaurantService
                .findRestaurantById(restaurantId)
                .then(function(response)
                {
                    console.log("In findRestaurantById");
                    console.log(response.data);
                    restaurantInstance = response.data;

                    if(restaurantInstance)
                    {
                        if(restaurantInstance.followers == null || restaurantInstance.followers.length == 0)
                        {
                            model.restaurantFollower = null;
                        }
                        else
                        {
                            model.restaurantFollower = restaurantInstance.followers;
                        }

                    }

                },function(err)
                {

                    console.log("Error in finding restaurant in restaurant Schema");
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
                });

            UserService
                .getCurrentUser()
                .then(function(response)
                {
                    var user = response.data;

                    if(user)
                    {
                        var restaurantList = user.restaurant;

                        currentUserInstance = user;

                        for (var i = 0; i < restaurantList.length; i++)
                        {

                            if (restaurantList[i].hotelId == restaurantId)
                            {
                                model.alreadyFollowing = true;
                                break;
                            }

                        }

                    }
                    else
                    {
                        model.alreadyFollowing = false;
                    }
                },function(err)
                {
                    alert("Unable to find current loggedin user");
                    console.log(err);
                });


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
                            //init();
                            //$location.path("/login");
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
                            init();
                            alert("You need to login to vote!!!");
                            //$location.path("/login");
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
                        //$location.path("/login");
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

        function restaurantFollow(restaurantObj)
        {
            console.log("In restaurantFollow");
            console.log(restaurantObj);

            console.log(restaurantInstance);

            UserService
                .getCurrentUser()
                .then(function(response)
                {
                    //console.log(response.data);
                    var user = response.data;

                    if(user)
                    {

                        var alreadyFollowing = false;

                        var restaurantList = user.restaurant;

                        for (var i = 0; i < restaurantList.length; i++)
                        {

                            if (restaurantList[i].hotelId == restaurantId)
                            {
                                alreadyFollowing = true;
                                break;
                            }

                        }


                        if(alreadyFollowing)
                        {
                            alert("You have already following for this restaurant!!!");
                            init();
                        }
                        else
                        {

                            var followerObj = {userId:user._id,username:user.username};

                            //console.log(followerObj);

                            //console.log(restaurantInstance);

                            if(restaurantInstance)
                            {
                                var newRestaurantInstance = restaurantInstance;

                                newRestaurantInstance.followers.push(followerObj);

                                //console.log(newRestaurantInstance);

                                RestaurantService
                                    .followRestaurant(newRestaurantInstance)
                                    .then(function(response)
                                    {
                                        var updatedRestaurantInstance = response.data;

                                        console.log(updatedRestaurantInstance);

                                        if(updatedRestaurantInstance)
                                        {
                                            var restoObj = {hotelId:updatedRestaurantInstance.hotelId,
                                                            hotelName:updatedRestaurantInstance.hotelName,
                                                            hotelImage:updatedRestaurantInstance.hotelPoster};

                                            var restoFollowUser = user;

                                            restoFollowUser.restaurant.push(restoObj);

                                            console.log(restoFollowUser);



                                            UserService
                                                .updateUser(user._id,restoFollowUser)
                                                .then(function(response)
                                                {
                                                    var updatedUser = response.data;

                                                    console.log(updatedUser);

                                                    if(updatedUser)
                                                    {
                                                        init();
                                                    }
                                                    else
                                                    {
                                                        console.log("Cannot find the user to update");
                                                    }
                                                },function(err)
                                                {
                                                    console.log("Error of updating user with restaurant");
                                                    console.log(err);
                                                });

                                        }
                                        else
                                        {
                                            console.log("Unable to follow restaurant!!!");
                                        }
                                    },function(err)
                                    {
                                        console.log("Error of updating restaurant instance");
                                        console.log(err);
                                    });
                            }
                            else
                            {
                                var hotelObj = {};

                                hotelObj.hotelId = restaurantObj.id;
                                hotelObj.hotelName = restaurantObj.name;
                                hotelObj.hotelPoster = restaurantObj.image_url;

                                //console.log(hotelObj);


                                RestaurantService
                                    .createRestaurant(hotelObj)
                                    .then(function(response)
                                    {
                                        //console.log(response.data);

                                        var newRestaurant = response.data;

                                        //console.log(newRestaurant.followers);

                                        newRestaurant.followers.push(followerObj);

                                        //console.log(newRestaurant);

                                        RestaurantService
                                            .followRestaurant(newRestaurant)
                                            .then(function(response)
                                            {
                                                var updatedRestaurantInstance = response.data;

                                                //console.log(updatedRestaurantInstance);

                                                if(updatedRestaurantInstance)
                                                {
                                                    var restoObj = {hotelId:updatedRestaurantInstance.hotelId,
                                                        hotelName:updatedRestaurantInstance.hotelName,
                                                        hotelImage:updatedRestaurantInstance.hotelPoster};

                                                    var restoFollowUser = user;

                                                    restoFollowUser.restaurant.push(restoObj);

                                                    //console.log(restoFollowUser);



                                                    UserService
                                                        .updateUser(user._id,restoFollowUser)
                                                        .then(function(response)
                                                        {
                                                            var updatedUser = response.data;

                                                            //console.log(updatedUser);

                                                            if(updatedUser)
                                                            {
                                                                init();
                                                            }
                                                            else
                                                            {
                                                                console.log("Cannot find the user to update");
                                                            }
                                                        },function(err)
                                                        {
                                                            console.log("Error of updating user with restaurant");
                                                            console.log(err);
                                                        });

                                                }
                                                else
                                                {
                                                    console.log("Unable to follow restaurant!!!");
                                                }
                                            },function(err)
                                            {
                                                console.log("Error of updating restaurant instance");
                                                console.log(err);
                                            });

                                    },function(err)
                                    {
                                        console.log("Error of creating restaurant instance");
                                        console.log(err);
                                    });
                            }
                        }

                    }
                    else
                    {
                        alert("You need to login to follow!!!");
                        //$location.path("/login");
                    }
                },function(err)
                {
                    console.log("Error of finding currentUser");
                    console.log(err);
                });


        }

        function restaurantUnFollow(restaurantObj)
        {
            console.log("In restaurantFollow");
            console.log(restaurantObj);

            var unFollowResto = restaurantInstance;



            var followerList = unFollowResto.followers;

            for (var i = 0; i < followerList.length; i++)
            {

                if (followerList[i].userId == currentUserInstance._id)
                {
                    followerList.splice(i, 1);
                    break;
                }

            }

            unFollowResto.followers = followerList;

            //console.log(unFollowResto);

            RestaurantService
                .unfollowRestaurant(unFollowResto)
                .then(function(response)
                {
                    var updatedRestaurantInstance = response.data;

                    //console.log(updatedRestaurantInstance);

                    if(updatedRestaurantInstance)
                    {

                        var userRestoList = currentUserInstance.restaurant;

                        for (var i = 0; i < userRestoList.length; i++)
                        {

                            if (userRestoList[i].hotelId == updatedRestaurantInstance.hotelId)
                            {
                                userRestoList.splice(i, 1);
                                break;
                            }

                        }

                        currentUserInstance.restaurant = userRestoList;

                        UserService
                            .updateUser(currentUserInstance._id,currentUserInstance)
                            .then(function(response)
                            {
                                var updatedUser = response.data;

                                //console.log(updatedUser);

                                if(updatedUser)
                                {
                                    init();
                                }
                                else
                                {
                                    console.log("Cannot find the user to update");
                                }
                            },function(err)
                            {
                                console.log("Error of updating user with restaurant unfollow");
                                console.log(err);
                            });

                    }
                    else
                    {
                        console.log("Unable to unfollow restaurant!!!");
                    }
                },function(err)
                {
                    console.log("Error of updating restaurant instance");
                    console.log(err);
                });
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

        //function goToLogin()
        //{
        //    $location.path("/login");
        //}
    }
})();