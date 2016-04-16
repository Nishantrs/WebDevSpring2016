/**
 * Created by NishantRatnakar on 4/7/2016.
 */


module.exports = function(mongoose){

    var ReviewSchema = mongoose.Schema({

        userId: String,
        username: String,
        hotelId:String,
        hotelname:String,
        comment:String,
        rating:Number,
        likes:Number,
        unlikes:Number
    }, {collection: 'reviewModel'});

    return ReviewSchema;
};