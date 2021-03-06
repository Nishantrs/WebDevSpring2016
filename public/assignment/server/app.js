/**
 * Created by NishantRatnakar on 3/16/2016.
 */

"use strict";



module.exports = function (app, db, mongoose) {

    //Following will change with database instance as parameters, once it is created.
    //var userModel = require("./models/user.model.js")(app);
    //var formModel = require("./models/form.model.js")(app);
    //var fieldModel = require("./models/field.model.js") (uuid, formModel);

    var userModel = require("./models/user.model.js")(db, mongoose);
    var formModel = require("./models/form.model.js")(db, mongoose);
    var fieldModel = require("./models/field.model.js")(db, formModel, mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js") (app, formModel, fieldModel);

    // alternative way
    //userService(app, userModel);
    //formService(app, formModel);
    //fieldService(app, formModel);
};

