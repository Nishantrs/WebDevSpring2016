/**
 * Created by NishantRatnakar on 3/9/2016.
 */


(function(){

    angular.module("HotelReview")
        .factory("UserService", UserService);


    function UserService() {

        console.log("In UserService");
        var users =
            [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "a", "password": "a", "roles": ["user"], "email":"", "bio": "I am a user.","city": "Boston","state": "Massachusetts"
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "b", "password": "b", "roles": ["admin"],"email":"", "bio": "I am a admin.","city": "Boston","state": "Massachusetts"
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["user"], "email":"", "bio": "I am a user.","city": "Boston","state": "Massachusetts"
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["user", "admin"], "email":"", "bio": "I am a admin.","city": "Boston","state": "Massachusetts"
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["user"], "email":"", "bio": "I am a user.","city": "Boston","state": "Massachusetts"
                }
            ];


        //Function declarations
        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;


        //Function implementation
        function findUserByCredentials(username, password, callback)
        {
            console.log("In findUserByCredentials");
            var found = null;

            for (var i = 0; i < users.length; i++) {

                if (users[i].username == username && users[i].password == password) {
                    found = users[i];
                    break;
                }
            }

            callback(found);
        }


        function findAllUsers(callback)
        {
            console.log("In findAllUsers");
            callback(users);
        }


        function createUser(user, callback)
        {
            console.log("In createUser");
            var newId = (new Date).getTime();
            user._id = newId;
            users.push(user);
            callback(user);
            console.log(user);
        }



        function deleteUserById(userId, callback)
        {
            console.log("In deleteUserById");
            for(var i=0; i < users.length; i++)
            {
                if(users[i]._id == userId)
                {
                    users.splice(i,1);
                    break;
                }
            }
            callback(users);
        }


        function updateUser(userId, user, callback)
        {
            console.log("In updateUser");
            for(var i=0; i < users.length; i++)
            {
                console.log("In loop");
                if(users[i]._id == userId)
                {
                    users[i] = user;
                    console.log(users[i]);
                    callback(users[i]);

                    break;
                }
            }
        }
    }

})();
