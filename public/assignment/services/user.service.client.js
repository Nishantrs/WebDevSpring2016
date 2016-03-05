/**
 * Created by NishantRatnakar on 2/28/2016.
 */



(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);


    function UserService() {

        var users =
            [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"], "email":""
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"],"email":""
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"], "email":""
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"], "email":""
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"], "email":""
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
            callback(users);
        }


        function createUser(user, callback)
        {
            var newId = (new Date).getTime();
            user._id = newId;
            users.push(user);
            callback(user);
            console.log(user);
        }



        function deleteUserById(userId, callback)
        {
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
            for(var i=0; i < users.length; i++)
            {
                if(users[i]._id == userId)
                {
                    users[i] = user;
                    callback(users[i]);
                    console.log(users[i]);
                    break;
                }
            }
        }
    }

})();