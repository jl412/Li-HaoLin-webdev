var app = require('../express');

var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds157282.mlab.com:57282/heroku_3z32f873'; // user yours
}
// Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"
// above with your own URL given to you by mLab

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = q.Promise;


require('./services/user.service.server');
require('./services/website.service.server');
require('./services/widget.service.server');
require('./services/page.service.server');

console.log("app.js");

app.get('/websites', getWebsites);


function getWebsites(req, res) {
    var websites = [
        {name:'facebook'},
        {name:'twitter'}
    ]

    res.send(websites);

}
