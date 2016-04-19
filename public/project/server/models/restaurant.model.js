/**
 * Created by NishantRatnakar on 4/7/2016.
 */


//follow restaurant,,,,requires user model.

var q = require("q");

"use strict";


module.exports = function (db, mongoose, RestaurantSchema) {

    var Restaurant = mongoose.model("RestaurantModel", RestaurantSchema);

    var api =
    {
        createRestaurant:createRestaurant,
        findRestaurantById:findRestaurantById,
        updateRestaurantById:updateRestaurantById
        //getAllFollowers:getAllFollowers
    };
    return api;


    function createRestaurant(hotelObj)
    {

        console.log(".....................................................");
        console.log("In Model createRestaurant");

        hotelObj.follower = [];


        var deferred = q.defer();

        console.log(".....................................................");
        console.log("In Model createRestaurant....after adding parameters");
        console.log(hotelObj);

        Restaurant
            .create(hotelObj, function(err, doc){
            if (err)
            {
                console.log(".....................................................");
                console.log("In Model createRestaurant....unsuccessful creation of restaurant");
                deferred.reject (err);
            }
            else
            {
                console.log(".....................................................");
                console.log("In Model createRestaurant....successful creation of restaurant");
                console.log(doc);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }


    function findRestaurantById(hotelId)
    {

        var deferred = q.defer();

        console.log(".....................................................");
        console.log("In Model findRestaurantById");

        Restaurant
            .findOne({hotelId: hotelId}, //findById
                function(err, restaurant)
                {
                    if (err)
                    {
                        console.log(".....................................................");
                        console.log("In Model findRestaurantById......unsuccessful");
                        deferred.reject (err);
                    }
                    else
                    {
                        console.log(".....................................................");
                        console.log("In Model findRestaurantById.......successful");
                        console.log(restaurant);
                        deferred.resolve (restaurant);
                    }
                });

        return deferred.promise;
    }



    function updateRestaurantById(hotelId,followerList)
    {
        var deferred = q.defer();

        console.log(".....................................................");
        console.log("In Model updateRestaurantById");

        Restaurant
            .findByIdAndUpdate(hotelId,
                {$set:{
                    followers:followerList}}, //newly added
                function(err , stats)
                {
                    if(stats)
                    {
                        console.log(".....................................................");
                        console.log("In Model updateRestaurantById.....update successful");

                        Restaurant
                            .findById(hotelId,
                                function(err , restaurant){
                                    if (err)
                                    {
                                        console.log(".....................................................");
                                        console.log("In Model updateRestaurantById.....cannot find restaurant after update");
                                        deferred.reject (err);
                                    }
                                    else
                                    {
                                        console.log(".....................................................");
                                        console.log("In Model updateRestaurantById.....restaurant after update");
                                        console.log(restaurant);
                                        deferred.resolve(restaurant);
                                    }

                                });
                    }
                    else
                    {
                        console.log(".....................................................");
                        console.log("In Model updateRestaurantById.....update unsuccessful");
                        deferred.reject(err);
                    }
                });

        return deferred.promise;
    }

    //function getAllFollowers(hotelId)
    //{
    //
    //}

};
