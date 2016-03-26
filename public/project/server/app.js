/**
 * Created by NishantRatnakar on 3/20/2016.
 */


"use strict";

module.exports = function (app, uuid) {

    //Following will change with database instance as parameters, once it is created.
    var userModel = require("./models/user.model.js")(app, uuid);

    //Following files hold the endpoint on the server side.
    var userService = require("./services/user.service.server.js")(app, userModel);

    // alternative way
    //userService(app, userModel);
    //formService(app, formModel);
    //fieldService(app, formModel);
};