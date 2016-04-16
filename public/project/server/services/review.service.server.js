/**
 * Created by NishantRatnakar on 4/7/2016.
 */


module.exports = function(app, reviewModel)
{

    app.post("/api/project/review", createReview);

    app.put("/api/project/review/:id", updateReviewById);

    app.get("/api/project/review", decideEndpoint);

    app.delete("/api/project/review", decideEndPointForDelete);

    //app.put('/api/user/:id/follower',addFollower);


    function decideEndpoint(req, res)
    {

        console.log(".....................................................");
        console.log("In server review services Deciding Endpoint...");

        if(req.query.userId)
        {
            findReviewsForUser(req, res);
        }
        else if (req.query.hotelId)
        {
            findReviewsForHotel(req, res);
        }
        else if (req.query.reviewId)
        {
            findReviewById(req, res);
        }
        else
        {
            findAllReviews(req, res);
        }
    }

    function decideEndPointForDelete(req,res)
    {
        console.log(".....................................................");
        console.log("In server review services Deciding Endpoint...For delete");

        if(req.query.reviewId)
        {
            deleteReviewById(req,res);
        }
        else
        {
            deleteReviewByUserId(req,res);
        }
    }



    function createReview(req, res)
    {
        //console.log(".....................................................");
        //console.log("In server services createReview");

        var newReview = req.body;

        reviewModel
            .createReview (newReview)
            .then (
                function(review)
                {
                    res.json(review);
                },
                function(err)
                {
                    res.status(400).send(err);
                });
    }

    function updateReviewById(req, res)
    {

        //console.log(".....................................................");
        //console.log("In server review services update review");

        var reviewId = req.params.id;
        var reviewObj = req.body;

        //console.log(reviewId);
        //console.log(reviewObj);

        reviewModel
            .updateReviewById(reviewId, reviewObj)
            .then(function(review)
                {
                    res.json(review);
                },
                function(err)
                {
                    res.status(400).send(err);
                });
    }

    function deleteReviewById(req, res)
    {
        console.log(".....................................................");
        console.log("In server review services delete review");

        var reviewId = req.query.reviewId;

        reviewModel
            .deleteReviewById(reviewId)
            .then(function(stats)
                {
                    res.send(200);
                },
                function(err)
                {
                    res.status(400).send(err);
                });
    }


    function deleteReviewByUserId(req, res)
    {
        console.log(".....................................................");
        console.log("In server review services delete review by userId");

        var userId = req.query.userId;

        reviewModel
            .deleteReviewByUserId(userId)
            .then(function(stats)
                {
                    res.send(200);
                },
                function(err)
                {
                    res.status(400).send(err);
                });
    }


    function findAllReviews(req, res)
    {
        console.log(".....................................................");
        console.log("In server review services findAllReviews");

        reviewModel
            .findAllReviews()
            .then (
                function(reviews)
                {
                    res.json(reviews);
                },
                function(err)
                {
                    res.status(400).send(err);
                });
    }

    function findReviewById(req, res)
    {
        console.log(".....................................................");
        console.log("In server review services findReviewById");

        var reviewId = req.query.reviewId;

        console.log(reviewId);

        reviewModel
            .findReviewById(reviewId)
            .then(function(review)
                {
                    res.json(review);
                },
                function(err)
                {
                    res.status(400).send(err);
                });
    }


    function findReviewsForUser(req, res)
    {
        //console.log(".....................................................");
        //console.log("In server review services findReviewsForUser");

        var userId = req.query.userId;

        //console.log(userId);

        reviewModel
            .findReviewsForUser(userId)
            .then(function(reviews)
                {
                    res.json(reviews);
                },
                function(err)
                {
                    res.status(400).send(err);
                });

    }

    function findReviewsForHotel(req, res)
    {

        //console.log(".....................................................");
        //console.log("In server review services findReviewsForHotel");

        var hotelId = req.query.hotelId;

        //console.log(hotelId);

        reviewModel
            .findReviewsForHotel(hotelId)
            .then(function(reviews)
                {
                    res.json(reviews);
                },
                function(err)
                {
                    res.status(400).send(err);
                });
    }





    //function addFollower(req,res){
    //
    //    var userId = req.params.id;
    //    var follower = req.body;
    //
    //    userModel
    //        .addFollower(userId,follower)
    //        .then(function(user)
    //            {
    //                req.session.currentUser = user;
    //                res.json(user);
    //            },
    //            function(err)
    //            {
    //                res.status(400).send(err);
    //            });
    //}

};