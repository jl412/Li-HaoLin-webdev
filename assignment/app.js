var app = require('../express');
var q = require('q');


var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds157282.mlab.com:57282/heroku_3z32f873'; // user yours
    console.log("mongo running remotely");
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = q.Promise;


require('./services/user.service.server');
require('./services/website.service.server');
require('./services/widget.service.server');
require('./services/page.service.server');

// console.log("app.js");
//
// app.get('/websites', getWebsites);
//
//
// function getWebsites(req, res) {
//     var websites = [
//         {name:'facebook'},
//         {name:'twitter'}
//     ]
//
//     res.send(websites);
//
// }
