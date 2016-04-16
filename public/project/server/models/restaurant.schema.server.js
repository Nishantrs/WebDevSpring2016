/**
 * Created by NishantRatnakar on 4/7/2016.
 */


module.exports = function(mongoose){

    var RestaurantSchema = mongoose.Schema({
        hotelId:String,
        hotelName:String,
        hotelPoster:String,
        followers:[{userId:String, username:String}]
    }, {collection: 'restaurantModel'});

    return RestaurantSchema;
};