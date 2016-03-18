/**
 * Created by NishantRatnakar on 3/16/2016.
 */

"use strict";

module.exports = function (app) {

    //Following will change with database instance as parameters, once it is created.
    var userModel = require("./models/user.model.js")(app);
    var formModel = require("./models/form.model.js")(app);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);

    // alternative way
    //userService(app, userModel);
    //formService(app, formModel);
    //fieldService(app, formModel);
};

