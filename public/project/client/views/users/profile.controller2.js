/**
 * Created by NishantRatnakar on 4/9/2016.
 */

/**
 * Created by NishantRatnakar on 3/4/2016.
 */


"use strict";

(function(){

    angular
        .module("HotelReview")
        .controller("ProfileController2", ProfileController2);

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
        vm.editReview = editReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.isReviews = true;
        vm.isFollowing = false;
        vm.isFollower = false;
        vm.reviewEdit = false;

        vm.review = {comment:"",rating:""};
        vm.reviews = null;
        vm.update = {};

        function init()
        {
            //console.log("in init()");

            if(userId)
            {
                UserService
                    .findUserById(userId)
                    .then(function(response)
                    {
                        var user = response.data;

                        if(user)
                        {
                            UserService.setDisplayUser(user);

                            vm.displayUser = UserService.getDisplayUser();

                            vm.userdetailsedit = false;
                            //$scope.isCollapsedtrips = true;
                            //$scope.isCollapsedfollowers = true;
                            //$scope.isCollapsedfollowing = true;

                            ReviewService
                                .findReviewsForUser(userId)
                                .then(function(response)
                                {
                                    var userReviews = response.data;

                                    console.log(userReviews);

                                    if(userReviews.length == 0)
                                    {
                                        vm.reviews = null;
                                    }
                                    else
                                    {
                                        vm.reviews = userReviews;

                                        for(var i=0;i<userReviews.length;i++)
                                        {
                                            vm.reviewEdit[i] = false;

                                        }
                                    }
                                },function(err)
                                {
                                    console.log("Error finding reviews for user");
                                    console.log(err);
                                })
                        }
                        else
                        {
                            alert("Cannot find user");
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

                            vm.displayUser = UserService.getDisplayUser();

                            vm.userdetailsedit = false;
                            //$scope.isCollapsedtrips = true;
                            //$scope.isCollapsedfollowers = true;
                            //$scope.isCollapsedfollowing = true;

                            ReviewService
                                .findReviewsForUser(user._id)
                                .then(function(response)
                                {
                                    var userReviews = response.data;

                                    console.log(userReviews);

                                    if(userReviews.length == 0)
                                    {
                                        vm.reviews = null;
                                    }
                                    else
                                    {
                                        for(var i=0;i<userReviews.length;i++)
                                        {
                                            vm.reviewEdit[i] = false;

                                        }
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
            vm.isReviews = true;
            vm.isFollowing = false;
            vm.isFollower = false;
        }

        function showFollowing()
        {
            vm.isReviews = false;
            vm.isFollowing = true;
            vm.isFollower = false;
        }

        function showFollower()
        {
            vm.isReviews = false;
            vm.isFollowing = false;
            vm.isFollower = true;
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

        function editReview(num)
        {
            console.log(num);
            console.log(vm.reviewEdit[num]);
            vm.reviewEdit[num] = !(vm.reviewEdit[num]);
        }

        function updateReview(review)
        {
            if(vm.review.comment == "")
            {
                alert("Please update the review with some comments.")
            }
            else if(vm.review.rating == "")
            {
                alert("Please update the review with some rating.")
            }
            else
            {
                var reviewObj = review;

                reviewObj.comment = vm.review.comment;

                reviewObj.rating = ratingConversion(vm.review.rating);

                console.log(reviewObj);

                ReviewService
                    .updateReviewById(review._id,reviewObj)
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

        function deleteReview(review)
        {
            ReviewService
                .deleteReviewById(review._id)
                .then(function(response)
                {
                    var status = response.data;

                    console.log(status);

                    if(status)
                    {
                        init();
                        console.log("Review deleted!!!");
                    }
                    else
                    {
                        console.log("Cannot delete review");
                    }
                },function(err)
                {
                    console.log("Error in deleting review");
                    console.log(err);
                })

        }
    }
})();