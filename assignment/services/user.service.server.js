var app = require('../../express');

app.get('/api/assignment/user', findUser);
app.get('/api/assignment/user/:uid', findUserById);
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:uid', updateUser);
app.delete('/api/assignment/user/:uid', deleteUser);

console.log("userService");

var users =
    [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


function createUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.send(user);
}


function findUserByUsername(req, res) {
    console.log("findUserByUsername");
    var username = req.query['username'];


    res.sendStatus(404);
}


function findUser(req, res) {

    var username = req.query['username'];
    var password = req.query['password'];

    console.log(username + " ; " + password);

    if(username&&password){
        for(var u in users){
            user = users[u];
            if(user.username === username
                && user.password === password) {
                res.json(user);
                return;
            }
        }
    }else if(username){
        for(var u in users){
            user = users[u];
            if(user.username === username) {
                res.json(user);
                return;
            }
        }
        res.send("0");
        return;
    }

    res.sendStatus(404);
}

function findUserById(req, res) {
    var uid =  req.params['uid'];
    var user = users.find(function (user) {
        return user._id === uid;
    });
    res.send(user);
}


function deleteUser(req, res) {
    var uid = req.params.uid;
    var user = users.find(function (user) {
        return user._id ===uid;
    });
    var index = users.indexOf(user);
    users.splice(index,1);
    res.sendStatus(200);
}


function updateUser(req, res) {
    var user = req.body;
    var uid = req.params.uid;
    for (var u in users){
        if(uid === users[u]._id){
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}
