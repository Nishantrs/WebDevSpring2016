/**
 * Created by NishantRatnakar on 3/10/2016.
 */


(function() {

    angular.module("HotelReview")
        .controller("ReviewsController", ReviewsController);

    function ReviewsController($scope, $rootScope, $location, ReviewService)
    {

        $scope.addReview = addReview;
        $scope.updateReview = updateReview;
        $scope.deleteReview = deleteReview;
        $scope.selectReview = selectReview;

        $scope.fTitle = null;
        $scope.fmessage = null;
        $scope.selectedForm = null;

        var user = $rootScope.currentUser;



        getCurrentUserReviews(user);

        function getCurrentUserReviews(cUser)
        {
            var getForms = function(cUserForms)
            {
                $scope.userReviews = cUserForms
            };

            ReviewService.findAllReviewsForUser(cUser._id,getForms)
        }


        function addReview(formTitle)
        {
            console.log(formTitle);
            if(formTitle != null)
            {
                var newForm = {"_id": null, "title": formTitle, "userId": null, "comment":""};

                var newFormList = function(nform)
                {

                    var getForms = function(cUserForms)
                    {
                        $scope.userReviews = cUserForms;
                    };

                    ReviewService.findAllReviewsForUser(user._id, getForms);   //use getCurrentUserForms(user); instead
                };

                ReviewService.createReviewForUser(user._id, newForm, newFormList);
                $scope.fTitle = null;
                $scope.fmessage = "Review added!!!"

            }
            else
            {
                $scope.fmessage = "Please enter name of the Hotel.";
            }
        }



        function updateReview(formTitle)
        {

            if(formTitle != null)
            {
                if($scope.selectedForm != null)
                {
                    var updatedForm = {
                        "_id": $scope.selectedForm._id,
                        "title": formTitle,
                        "userId": $scope.selectedForm.userId
                    };

                    var updatedFormList = function(uform)
                    {
                        var getForms = function(cUserForms)
                        {
                            $scope.userReviews = cUserForms;
                        };

                        ReviewService.findAllReviewsForUser(user._id, getForms);
                    };

                    ReviewService.updateReviewById(updatedForm._id, updatedForm, updatedFormList);

                    $scope.fTitle = null;
                    $scope.fmessage = "Review updated!!!"
                }
                else
                {
                    $scope.fmessage = "Please select a review to update from the list below.";
                }
            }
            else
            {
                $scope.fmessage = "Please select a review to update.";
            }
        }


        function deleteReview(index)
        {

            var updatedFormList = function(forms)
            {
                var getForms = function(cUserForms)
                {
                    $scope.userReviews = cUserForms;
                };

                ReviewService.findAllReviewsForUser(user._id, getForms);
            };

            ReviewService.deleteReviewById($scope.userReviews[index]._id, updatedFormList);
            $scope.fmessage = "Review deleted!!!"
        }

        function selectReview(index)
        {
            //declaration of global variable selectedForm
            $scope.selectedForm = $scope.userReviews[index];
            $scope.fTitle = $scope.selectedForm.title;
        }




    }

})();