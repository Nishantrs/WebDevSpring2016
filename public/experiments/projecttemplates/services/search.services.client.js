/**
 * Created by NishantRatnakar on 3/3/2016.
 */


(function() {
    angular.module("HotelReview")
        .factory("SearchService", SearchService);

    function SearchService($http, $q, $rootScope) {
        $rootScope.callback_counter = 0;
        var api = {
            searchByTermAndPlace: searchByTermAndPlace
        };
        return api;

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];

            return result;
        }



        function searchByTermAndPlace(search_term, place,value) {

            console.log("In search");
            //var deferred = $q.defer();
            var method = "GET";
            var url = "http://api.yelp.com/v2/search?callback=JSON_CALLBACK";
            var params;
            if(value===0){
                params = {
                    callback: 'angular.callbacks._0',
                    location: place,
                    limit: 10,

                    oauth_consumer_key: 'wQnT8lY_CG7c4hlDdLCp1Q',
                    oauth_token: '7kWihlN8A45yDkmcV-wQOIrQYUCiYTJB',
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: new Date().getTime(),
                    oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                    term: search_term

                };

            }
            else if(value===undefined){
                params = {
                    callback: 'angular.callbacks._0',
                    location: place,
                    limit: 10,

                    oauth_consumer_key: 'wQnT8lY_CG7c4hlDdLCp1Q',
                    oauth_token: '7kWihlN8A45yDkmcV-wQOIrQYUCiYTJB',
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: new Date().getTime(),
                    oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                    term: search_term

                };

            }
            else{

                params = {
                    callback: 'angular.callbacks._0',
                    location: place,
                    limit: 10,
                    offset:value,
                    oauth_consumer_key: 'wQnT8lY_CG7c4hlDdLCp1Q',
                    oauth_token: '7kWihlN8A45yDkmcV-wQOIrQYUCiYTJB',
                    oauth_signature_method: "HMAC-SHA1",
                    oauth_timestamp: new Date().getTime(),
                    oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                    term: search_term

                };

            }


            var consumerSecret = 'rPXe_SkNTjqDK9L1RxozdQSkBYU';
            var tokenSecret = 'c_Pqo-Vb-jsKLqGKzJfDEFrsqGE';
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
                encodeSignature: false
            });

            //put signature in params
            params.oauth_signature = signature;

            console.log(params);
            console.log(url);

            $http.jsonp(url, {
                params: params
            }).success(function(response) {
                console.log(response);
                //deferred.resolve(response);

            }).error(function(response, status, header, config) {
                console.log(status);
                // deferred.resolve(response);
            });
            // return deferred.promise;
        }

    }

})();