/**
 * Created by NishantRatnakar on 3/29/2016.
 */


var mongoose = require("mongoose");

module.exports = function(){

    var FieldSchema = mongoose.Schema({

        label: String,
        type: String,
        placeholder: String,
        options: [{label:String,value:String}]
    });

    return FieldSchema;

};