/**
 * Created by NishantRatnakar on 3/11/2016.
 */

"use strict";
(function(){

    angular
        .module("HotelReview")
        .controller("ReviewDetailsController",ReviewDetailsController);

    function ReviewDetailsController($scope,$location,$routeParams,$rootScope,ReviewService){
        console.log("Inside ReviewDetailsController");

        $scope.$location=$location;

        var reviewid = $routeParams.reviewId;

        getReview(reviewid);

      function getReview(rid)
      {

          var render = function (review) {
              var uUser = $rootScope.currentUser;
              var Mycomment = review.comment;

              if(Mycomment == "")
              {$scope.Comment="New Comment. Temporary Fix. Need to work on the logic of reviews.";}
              else
              {$scope.Comment=Mycomment;}

              $location.path("/profile/"+ uUser._id+"/reviews/"+review._id);
             console.log("In render");
          };

          ReviewService.findReviewById(rid,render);
      }







    }

})();