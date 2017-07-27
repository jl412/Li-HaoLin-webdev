(function () {
    angular
        .module("WAM")
        .factory("userService", userService);

    function userService() {
        var users =
            [
                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
            ];

        var api = {
            createUser:createUser,
            findUserById:findUserById,
            findUserByUsername:findUserByUsername,
            findUserByCrendentials:findUserByCrendentials,
            updateUser:updateUser,
            deleteUser:deleteUser

        };

        return api;
        
        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
        }

        function findUserById(uid) {
            return users.find(function (user) {
                return user._id === uid;
            })
        }

        function findUserByUsername(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined')
                return null;
            else
                return user;
        }

        function findUserByCrendentials(username, password) {
            for(var u in users){
                user = users[u];
                if(user.username == username && user.password == password) {
                    return user;
                }
            }
            return null;
        }
        
        function updateUser(uid, newInfo) {
            var user = users.find(function (user) {
                return user._id ===uid;
            })
            user.firstName = newInfo.firstName;
            user.lastName = newInfo.lastName;
            user.email = newInfo.email;
            user.username = newInfo.username;
        }
        
        function deleteUser(uid) {
            var user = users.find(function (user) {
                return user._id ===uid;
            })
            var index = users.indexOf(user);
            users.splice(index,1);
        }
    }
})();