/**
 * Created by NishantRatnakar on 4/7/2016.
 */

module.exports = function(mongoose){

    var UserSchema = mongoose.Schema({

        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email:String,
        bio:String,
        roles:[String],
        state:String,
        city:String,
        created:Date,
        followers:[{userId:String, username:String}],
        following:[{userId:String, username:String}],
        votedFor:[{reviewId:String}],
        reviewedFor:[{hotelId:String}]
        //,restaurant:[{hotelId:String, hotelName:String, hotelImage:String}]
    }, {collection: 'userModel'});

    return UserSchema;

};