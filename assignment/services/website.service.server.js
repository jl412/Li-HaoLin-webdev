var app = require('../../express');

app.post('/api/assignment/user/:uid/website', createWebsite);
app.get('/api/assignment/user/:uid/website', findAllWebsitesForUser);
app.get('/api/assignment/user/:uid/website/:wid', findWebsiteById);
app.put('/api/assignment/user/:uid/website/:wid', updateWebsite);
app.delete('/api/assignment/user/:uid/website/:wid', deleteWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic  Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function createWebsite(req, res) {
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.send(website);
}

function findWebsiteById(req, res) {
    var uid =  req.params['uid'];
    var wid =  req.params['wid'];
    var website = websites.find(function (website) {
        return website._id === wid;
    });
    res.send(website);
}

function findAllWebsitesForUser(req, res) {
    var resultSet = [];
    for(var w in websites){
        if(websites[w].developerId === req.params.uid){
            resultSet.push(websites[w]);
        }
    }
    res.json(resultSet);
}

function updateWebsite(req, res) {
    var website = req.body;
    var uid = req.params.uid;
    var wid = req.params.wid;
    for (var w in websites){
        if(wid === websites[w]._id){
            websites[w].name = website.name;
            websites[w].description = website.description;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req, res) {

    var wid = req.params.wid;
    var website = websites.find(function (website) {
        return website._id ===wid;
    });
    var index = websites.indexOf(website);
    websites.splice(index,1);
    res.sendStatus(200);
}