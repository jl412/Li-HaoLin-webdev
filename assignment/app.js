var app = require('../express');

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
