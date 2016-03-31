/**
 * Created by NishantRatnakar on 3/29/2016.
 */



var Field = require("./field.schema.server.js");

module.exports = function(mongoose){

    var FormSchema = mongoose.Schema({

        userId: String,
        title: String,
        fields: [Field],
        created: Date,
        updated: Date
    }, {collection: 'form'});

    return FormSchema;

};