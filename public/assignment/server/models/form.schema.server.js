/**
 * Created by NishantRatnakar on 3/29/2016.
 */





module.exports = function(mongoose){

    var Field = require("./field.schema.server.js")(mongoose);

    //had done require Field outside the module.
    //had not passed the mongoose instance instead created a instance over there.
    // had not named the collection:'field' in the field schema.

    var FormSchema = mongoose.Schema({

        userId: String,
        title: String,
        fields: [Field],
        created: Date,
        updated: Date
    }, {collection: 'form'});

    return FormSchema;

};