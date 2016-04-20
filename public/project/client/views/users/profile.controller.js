/**
 * Created by NishantRatnakar on 3/4/2016.
 */


"use strict";

(function(){

    angular
        .module("HotelReview")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $scope, $rootScope, UserService, $routeParams, ReviewService){


        //console.log("in profile controller");

        var vm = this;
        var userId = $routeParams.userId;

        vm.profileEdit = profileEdit;
        vm.cancelEdit = cancelEdit;
        vm.saveProfileEdit = saveProfileEdit;
        vm.showReviews = showReviews;
        vm.showFollowing = showFollowing;
        vm.showFollower = showFollower;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.upvote = upvote;
        vm.downvote = downvote;
        vm.userFollow = userFollow;
        vm.userUnfollow = userUnfollow;
        vm.isAlreadyFollowing = false;
        vm.isAdminUser = false;
        vm.isReviews = true;
        vm.isFollowing = false;
        vm.isFollower = false;


        vm.reviews = null;
        vm.followings = null;
        vm.followers = null;
        vm.restaurants = null;
        vm.update = {};

        function init()
        {
            //console.log("in init()");

            vm.isAlreadyFollowing = false;
            vm.isReviews = true;
            vm.isFollowing = false;
            vm.isFollower = false;

            if(userId)
            {
                UserService
                    .findUserById(userId)
                    .then(function(response)
                    {

                        var user = response.data;

                        console.log(user);

                        if(user)
                        {
                            UserService.setDisplayUser(user);

                            vm.displayUser = UserService.getDisplayUser();

                            if(vm.displayUser.followers == null || vm.displayUser.followers.length == 0)
                            {
                                //console.log("In display user no followers");
                                vm.followers = null;
                            }
                            else
                            {
                                vm.followers = vm.displayUser.followers;
                            }

                            if(vm.displayUser.following == null || vm.displayUser.following.length == 0)
                            {
                                vm.followings = null;
                            }
                            else
                            {
                                vm.followings = vm.displayUser.following;
                            }

                            if(vm.displayUser.restaurant == null || vm.displayUser.restaurant.length == 0)
                            {
                                vm.restaurants = null;
                            }
                            else
                            {
                                vm.restaurants = vm.displayUser.restaurant;
                            }

                            vm.userdetailsedit = false;
                            //$scope.isCollapsedtrips = true;
                            //$scope.isCollapsedfollowers = true;
                            //$scope.isCollapsedfollowing = true;

                            ReviewService
                                .findReviewsForUser(userId)
                                .then(function(response)
                                {
                                    var userReviews = response.data;

                                    //console.log(userReviews);

                                    if(userReviews == null || userReviews.length == 0)
                                    {
                                        vm.reviews = null;
                                    }
                                    else
                                    {
                                        vm.reviews = userReviews;
                                    }
                                },function(err)
                                {
                                    console.log("Error finding reviews for user");
                                    console.log(err);
                                });

                            UserService
                                .getCurrentUser()
                                .then(function(response) {
                                    var user = response.data;

                                    if(user)
                                    {
                                        if(user.roles.indexOf('admin') >= 0)
                                        {
                                            UserService.isAdmin();
                                        }
                                        else
                                        {
                                            UserService.isNotAdmin();
                                        }

                                        var followingList = user.following;

                                        //console.log(reviewedList);
                                        console.log(followingList);
                                        console.log(followingList.length);

                                        if(followingList.length)
                                        {
                                            for (var i = 0; i < followingList.length; i++)
                                            {
                                                if (followingList[i].userId == userId)
                                                {
                                                    vm.isAlreadyFollowing = true;
                                                    break;
                                                }
                                            }
                                        }

                                    }
                                });
                        }
                        else
                        {
                            //$('noUser').modal('show');
                            alert("User Profile does not exist as it has been deleted!!! You will be directed to home page.");
                            $location.path("/home");
                        }
                    },function (err) {
                        console.log(err);
                    });
            }
            else
            {
                UserService
                    .getCurrentUser()
                    .then(function(response)
                    {
                        var user = response.data;

                        if(user)
                        {
                            UserService.setDisplayUser(user);

                            if(user.roles.indexOf('admin') >= 0)
                            {
                                UserService.isAdmin();
                            }
                            else
                            {
                                UserService.isNotAdmin();
                            }

                            vm.displayUser = UserService.getDisplayUser();

                            //console.log(vm.displayUser.followers);
                            //console.log(vm.displayUser.following);

                            if(vm.displayUser.followers == null || vm.displayUser.followers.length == 0)
                            {
                                vm.followers = null;
                            }
                            else
                            {
                                vm.followers = vm.displayUser.followers;
                            }

                            if(vm.displayUser.following == null || vm.displayUser.following.length == 0)
                            {
                                vm.followings = null;
                            }
                            else
                            {
                                vm.followings = vm.displayUser.following;
                            }

                            if(vm.displayUser.restaurant == null || vm.displayUser.restaurant.length == 0)
                            {
                                vm.restaurants = null;
                            }
                            else
                            {
                                vm.restaurants = vm.displayUser.restaurant;
                            }


                            vm.userdetailsedit = false;

                            ReviewService
                                .findReviewsForUser(user._id)
                                .then(function(response)
                                {
                                    var userReviews = response.data;

                                    //console.log(userReviews);

                                    if(userReviews.length == 0)
                                    {
                                        vm.reviews = null;
                                    }
                                    else
                                    {
                                        vm.reviews = userReviews;
                                    }
                                },function(err)
                                {
                                    console.log("Error finding reviews for user");
                                    console.log(err);
                                })
                        }
                        else
                        {
                            alert("Your are not loggedIn");
                            $location.path("/login");
                        }
                    },function (err) {
                        console.log(err);
                    });
            }
        }

        init();

        function profileEdit()
        {
            //console.log("In profile edit");
                vm.userdetailsedit = true;
                vm.update.lastName=vm.displayUser.lastName;
                vm.update.firstName=vm.displayUser.firstName;
                vm.update.password=vm.displayUser.password;
                vm.update.email =vm.displayUser.email;
                vm.update.city =vm.displayUser.city;
                vm.update.state =vm.displayUser.state;
                vm.update.bio = vm.displayUser.bio;

        }

        function cancelEdit()
        {
            //console.log("In cancel Edit");
            vm.userdetailsedit = false;
        }

        function saveProfileEdit(updateUser){

            //console.log("In saveProfileEdit");

            if (updateUser.firstName == "" ||
                updateUser.lastName == "" ||
                updateUser.password == "" ||
                updateUser.email == "" ||
                updateUser.bio == "" ||
                updateUser.city == "" ||
                updateUser.state == "")
            {
                alert("Please enter all the details");
                return;
            }


            UserService.getCurrentUser()
            .then(function(response)
            {
                var user = response.data;

                updateUser.votedFor = user.votedFor;
                updateUser.reviewedFor = user.reviewedFor;
                updateUser.roles = user.roles;
                updateUser.username = user.username;
                updateUser.following = user.following;
                updateUser.followers = user.followers;
                updateUser.restaurant = user.restaurant;


                UserService.updateUser(user._id,updateUser)
                    .then(function(response)
                    {
                        var updatedUser = response.data;


                        if(updatedUser)
                        {
                            console.log('Updated User');
                            console.log(updatedUser);

                            UserService.setDisplayUser(updatedUser);
                            UserService.setCurrentUser(updatedUser);
                            init();
                        }
                        else
                        {
                            alert("Profile cannot be update!!!");
                            return;
                        }
                },function (err) {
                        console.log(err);
                    });

            },function (err) {
                console.log(err);
            });

        }

        function showReviews()
        {
            //console.log("In showReviews");
            vm.isReviews = true;
            vm.isFollowing = false;
            vm.isFollower = false;
        }

        function showFollowing()
        {
            //console.log("In showFollowing");
            vm.isReviews = false;
            vm.isFollowing = true;
            vm.isFollower = false;
        }

        function showFollower()
        {
            //console.log("In showFollower");
            vm.isReviews = false;
            vm.isFollowing = false;
            vm.isFollower = true;
        }


        function updateReview(review)
        {
            //console.log(review.rating);
            //console.log(review.comment);
            //console.log(ratingConversion(review.rating));
            //console.log(review.likes);
            //console.log(review.unlikes);

            if(review.comment == "")
            {
                alert("Please update the review with some comments.")
            }
            else if(review.rating == "")
            {
                alert("Please update the review with some rating.")
            }
            else
            {
                //var reviewObj = review;

                //reviewObj.comment = vm.review.comment;

                review.rating = ratingConversion(review.rating);

                //console.log(reviewObj);

                ReviewService
                    .updateReviewById(review._id,review)
                    .then(function(response)
                    {
                        var updatedReview = response.data;

                        console.log(updatedReview);

                        if(updatedReview)
                        {
                            init();
                        }
                        else
                        {
                            console.log("Cannot find updated review");
                        }
                    },function(err)
                    {
                        console.log("Error of update review");
                        console.log(err);
                    })

            }

        }

        function ratingConversion(value)
        {
            if(value == "0(forgetful)" || value == 0)
            {
                return 0;
            }
            else if(value == "1(bad)" || value == 1)
            {
                return 1;
            }
            else if(value == "2(Average)" || value == 2)
            {
                return 2;
            }
            else if(value == "3(Good)" || value == 3)
            {
                return 3;
            }
            else if(value == "4(Amazing)" || value == 4)
            {
                return 4;
            }
            else (value == "5(The Best!!!)" || value == 5)
            {
                return 5;
            }
        }

        function deleteReview(review)
        {
            ReviewService
                .deleteReviewById(review._id)
                .then(function(response)
                {
                    //console.log("Review deleted!!!");

                    var status = response.data;

                    //console.log(status);

                    if(status)
                    {
                        UserService
                            .findUserById(review.userId)
                            .then(function(response)
                            {
                                var reviewedUser = response.data;

                                if(reviewedUser)
                                {
                                    var reviewedList = reviewedUser.reviewedFor;

                                    var votedList = reviewedUser.votedFor;

                                    //console.log(reviewedList);
                                    //console.log(votedList);

                                    for (var i = 0; i < reviewedList.length; i++)
                                        {
                                            if (reviewedList[i].hotelId == review.hotelId)
                                                {
                                                    reviewedList.splice(i, 1);
                                                    break;
                                                }
                                        }

                                    reviewedUser.reviewedFor = reviewedList;

                                    for (var i = 0; i < votedList.length; i++)
                                    {
                                        if (votedList[i].reviewId == review._id)
                                        {
                                            votedList.splice(i, 1);
                                            break;
                                        }
                                    }

                                    reviewedUser.votedFor = votedList;


                                    UserService
                                        .updateUser(reviewedUser._id,reviewedUser)
                                        .then(function(response)
                                        {
                                            var updatedReviewedUser = response.data;

                                            if(updatedReviewedUser)
                                            {
                                                //console.log("Review deleted and User Updated!!!");
                                                init();
                                            }
                                            else
                                            {
                                                console.log("Review deleted but User is null!!!");
                                            }
                                        },function(err)
                                        {
                                            console.log("Error in finding reviewed user");
                                            console.log(err);
                                        });
                                }
                                else
                                {
                                    console.log("Cannot find user whose review was deleted!!!");
                                }
                            },function(err)
                            {
                                console.log("Error in finding reviewed user");
                                console.log(err);
                            });
                    }
                    else
                    {
                        console.log("Cannot delete review");
                    }
                },function(err)
                {
                    console.log("Error in deleting review");
                    console.log(err);
                });
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
                            return;
                            //init();
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
                            return;
                            //init();
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
                    console.log("Error in finding currentUser");
                    console.log(err);
                });
        }


        function userFollow()
        {
            UserService
                .getCurrentUser()
                .then(function(response)
                {
                    var user = response.data;

                    if(user)
                    {
                        var alreadyFollowing = false;

                        var followingList = user.following;

                        for (var i = 0; i < followingList.length; i++)
                        {

                            if (followingList[i].userId == userId)
                            {
                                alreadyFollowing = true;
                                break;
                            }

                    }

                    console.log(alreadyFollowing);

                    if(alreadyFollowing)
                    {
                        alert("You have already following this user!!!");
                        return;
                    }
                    else
                    {
                        var follower = {userId:user._id,username:user.username,following:vm.displayUser.username};

                        //console.log(follower);


                            UserService
                                .addFollower(userId,follower)
                                .then(function(response)
                                {
                                    var displayUser = response.data;

                                    if(displayUser)
                                    {
                                        //UserService.setDisplayUser(displayUser);
                                        //
                                        //vm.displayUser = UserService.getDisplayUser();

                                        init();
                                    }
                                    else
                                    {
                                        console.log("Cannot find displayUser with updated followers");
                                    }
                                },function(err)
                                {
                                    console.log("...................................");
                                    console.log("Error in finding displayUser with updated followers");
                                    console.log(err);
                                });

                        }

                    }
                    else
                    {
                        //alert("You need to login to follow!!!");
                        $location.path("/login");
                    }


                },function(err)
                {
                    console.log("...................................");
                    console.log("Error in finding currentUser");
                    console.log(err);
                });


        }


        function userUnfollow()
        {

            console.log("userUnfollow!!!");

            UserService
                .getCurrentUser()
                .then(function(response)
                {
                    var user = response.data;

                    console.log(user);

                    if(user)
                    {

                        var followingList = user.following;

                        for (var i = 0; i < followingList.length; i++)
                        {

                            if (followingList[i].userId == userId)
                            {
                                followingList.splice(i, 1);
                                break;
                            }

                        }

                        user.following = followingList;

                        UserService
                            .updateUser(user._id,user)
                            .then(function(response)
                            {
                                var userFollowingUpdated = response.data;

                                //console.log("...................................");
                                console.log("userFollowingUpdated");
                                console.log(userFollowingUpdated);

                                if(userFollowingUpdated)
                                {

                                    UserService
                                        .findUserById(userId)
                                        .then(function(response)
                                        {
                                            var displayUser = response.data;

                                            var followerList = displayUser.followers;

                                            for (var i = 0; i < followerList.length; i++)
                                            {

                                                if (followerList[i].userId == user._id)
                                                {
                                                    followerList.splice(i, 1);
                                                    break;
                                                }

                                            }

                                            displayUser.following = followerList;

                                            UserService
                                                .removeFollower(displayUser)
                                                //.updateUser(false, displayUser)
                                                .then(function(response)
                                                {
                                                    var updatedDisplayUSer = response.data;

                                                    console.log("updatedDisplayUSer");
                                                    console.log(updatedDisplayUSer);

                                                    if(updatedDisplayUSer)
                                                    {
                                                        init();
                                                    }
                                                    else
                                                    {
                                                        console.log("Cannot updated follower of displayUSer");
                                                    }
                                                },function(err)
                                                {
                                                    console.log("...................................");
                                                    console.log("Error of update user follower");
                                                    console.log(err);
                                                });

                                        },function(err)
                                        {
                                            console.log("...................................");
                                            console.log("Error in finding displayUser");
                                            console.log(err);
                                        });
                                }
                                else
                                {
                                    console.log("Cannot update user following");
                                }
                            },function(err)
                            {
                                console.log("...................................");
                                console.log("Error of update user following");
                                console.log(err);
                            });


                    }


                },function(err)
                {
                    console.log("...................................");
                    console.log("Error in finding currentUser");
                    console.log(err);
                });


        }
    }
})();