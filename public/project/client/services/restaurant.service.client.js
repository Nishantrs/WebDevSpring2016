/**
 * Created by NishantRatnakar on 3/9/2016.
 */


/* Have to work on the functionality of the Restaurant Details. Able to retrieve data for the time being.*/

(function(){

    angular.module("HotelReview")
        .factory("RestaurantService", RestaurantService);

    function RestaurantService($http, $q, $rootScope) {

        var api =
        {
            searchByRestaurantId:searchByRestaurantId
        };

        return api;

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];

            return result;
        }

        function searchByRestaurantId(bid)
        {

            ////console.log("Here..........");

            var deferred = $q.defer();




            var method = "GET";
            var url = "https://api.yelp.com/v2/business/"+bid+"?callback=JSON_CALLBACK";


            var params = {
                callback: 'angular.callbacks._0',

                oauth_consumer_key: 'wQnT8lY_CG7c4hlDdLCp1Q',
                oauth_token: '7kWihlN8A45yDkmcV-wQOIrQYUCiYTJB',
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                term: "food"



            };
            var consumerSecret = 'rPXe_SkNTjqDK9L1RxozdQSkBYU';
            var tokenSecret = 'c_Pqo-Vb-jsKLqGKzJfDEFrsqGE';
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
                encodeSignature: false
            });

            //put signature in params
            params.oauth_signature = signature;

            $http.jsonp(url, {
                params: params
            }).success(function(response) {

                deferred.resolve(response);


            }).error(function(response) {

                deferred.resolve(response);

            });

            return deferred.promise;



        }
    }

})();