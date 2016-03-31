/**
 * Created by NishantRatnakar on 3/29/2016.
 */


module.exports = function(mongoose){

    var UserSchema = mongoose.Schema({

        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails:[String],
        phones:[String],
        roles:[String]
       }, {collection: 'user'});

    return UserSchema;

};