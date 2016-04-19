/**
 * Created by NishantRatnakar on 4/7/2016.
 */


module.exports = function(app, restaurantModel)
{
    app.post("/api/project/restaurant", createRestaurant);

    app.get("/api/project/restaurant", findRestaurantById);

    //app.get("/api/project/restaurant/follwers", getAllFollowers);

    app.put('/api/project/restaurant/follow/:id',followRestaurant);

    app.put('/api/project/restaurant/unfollow/:id',unfollowRestaurant);


    function createRestaurant(req, res)
    {

        console.log(".....................................................");
        console.log("In server restaurant services createRestaurant");

        var newRestaurant = req.body;

        console.log(newRestaurant);

        restaurantModel
            .createRestaurant (newRestaurant)
            .then (
                function(restaurant)
                {
                    res.json(restaurant);
                },
                function(err)
                {
                    res.status(400).send(err);
                });
    }

    //function getAllFollowers(req, res)
    //{
    //    console.log(".....................................................");
    //    console.log("In server restaurant services getAllFollowers");
    //
    //    var restaurantId = req.query.id;
    //
    //    console.log(restaurantId);
    //
    //    restaurantModel
    //        .getAllFollowers(restaurantId)
    //        .then (
    //            function(users)
    //            {
    //                res.json(users);
    //            },
    //            function(err)
    //            {
    //                res.status(400).send(err);
    //            });
    //}

    function findRestaurantById(req, res)
    {
        console.log(".....................................................");
        console.log("In server restaurant services findRestaurantById");

        var restaurantId = req.query.id;

        console.log(restaurantId);

        restaurantModel
            .findRestaurantById(restaurantId)
            .then(function(restaurant)
                {
                    console.log(".....................................................");
                    console.log("In server restaurant services findRestaurantById...returned restaurant");
                    console.log(restaurant);
                    res.json(restaurant);
                },
                function(err)
                {
                    res.status(400).send(err);
                });

    }



    function followRestaurant(req, res)
    {

        console.log(".....................................................");
        console.log("In server restaurant services update restaurant followRestaurant");

        var restaurantId = req.params.id;
        var followerList = req.body;

        console.log(restaurantId);
        console.log(followerList);

        restaurantModel
            .updateRestaurantById(restaurantId, followerList)
            .then(function(restaurant)
                {
                    console.log(".....................................................");
                    console.log("In server restaurant services followRestaurant...returned restaurant");
                    res.json(restaurant);
                },
                function(err)
                {
                    res.status(400).send(err);
                });


    }


    function unfollowRestaurant(req, res)
    {

        console.log(".....................................................");
        console.log("In server restaurant services update restaurant unfollowRestaurant");

        var restaurantId = req.params.id;
        var followerList = req.body;

        console.log(restaurantId);
        console.log(followerList);

        restaurantModel
            .updateRestaurantById(restaurantId, followerList)
            .then(function(restaurant)
                {
                    console.log(".....................................................");
                    console.log("In server restaurant services unfollowRestaurant...returned restaurant");
                    res.json(restaurant);
                },
                function(err)
                {
                    res.status(400).send(err);
                });


    }
};