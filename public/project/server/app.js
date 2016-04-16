/**
 * Created by NishantRatnakar on 3/20/2016.
 */


"use strict";

module.exports = function (app, db, mongoose) {

    var UserSchema = require("./models/user.schema.server.js")(mongoose,db);
    var ReviewSchema = require("./models/review.schema.server.js")(mongoose,db);
    var RestaurantSchema = require("./models/restaurant.schema.server.js")(mongoose,db);

    var userModel = require("./models/user.model.js")(db, mongoose, UserSchema);
    var reviewModel = require("./models/review.model.js")(db, mongoose, ReviewSchema);
    var restaurantModel = require("./models/restaurant.model.js")(db, mongoose, RestaurantSchema);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var reviewService = require("./services/review.service.server.js")(app, reviewModel);
    //var restaurantService = require("./services/restaurant.service.server.js") (app, restaurantModel);

};