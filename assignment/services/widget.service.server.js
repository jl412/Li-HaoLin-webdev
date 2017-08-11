var app = require('../../express');


var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: _dirname +  '../../public/uploads' });

app.get('/api/assignment/user/:uid/website/:wid/page/:pid/widget', findWidgetsByPid);
app.post('/api/assignment/user/:uid/website/:wid/page/:pid/widget', createWidget);
app.get('/api/assignment/user/:uid/website/:wid/page/:pid/widget/:wgid', findWidgetById);
app.put('/api/assignment/user/:uid/website/:wid/page/:pid/widget/:wgid', updateWidget);
app.put('/page/:pid/widget?', updateOrder);
app.delete('/api/assignment/user/:uid/website/:wid/page/:pid/widget/:wgid', deleteWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);


var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];




function findWidgetById(req, res) {
    var uid =  req.params['uid'];
    var wid =  req.params['wid'];
    var pid =  req.params['pid'];
    var wgid =  req.params['wgid'];
    var widget = widgets.find(function (widget) {
        return widget._id === wgid;
    });
    res.send(widget);
}


function findWidgetsByPid(req, res) {
    var resultSet = [];
    for(var w in widgets){
        if(widgets[w].pageId === req.params.pid){
            resultSet.push(widgets[w]);
        }
    }
    res.json(resultSet);
}

function createWidget(req, res) {
    var widget = req.body;
    widgets.push(widget);
    res.send(widget);

}


function updateWidget(req, res) {
    var widget = req.body;
    var uid = req.params.uid;
    var wid = req.params.wid;
    var pid = req.params.pid;
    var wgid =  req.params.wgid;

    for (var w in widgets){
        if(wgid === widgets[w]._id){
            widgets[w].name = widget.name;
            widgets[w].text = widget.text;
            widgets[w].size = widget.size;
            widgets[w].width = widget.width;
            widgets[w].url = widget.url;

            res.sendStatus(200);
            return;

        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res) {
    var wgid = req.params.wgid;
    var widget = widgets.find(function (widget) {
        return widget._id ===wgid;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index,1);
    res.sendStatus(200);
}

function updateOrder(req, res) {

    var initial = req.query['initial'];
    var final = req.query['final'];
    var widget = widgets[initial];

    var resultSet = [];
    for(var w in widgets){
        if(widgets[w].pageId === req.params.pid){
            resultSet.push(widgets[w]);
        }
    }

    widgets.splice(initial, 1);
    widgets.splice(final, 0, widget);

}

function uploadImage(req, res) {

    var wgid      = req.body.wgid;
    var width         = req.body.width;
    var myFile        = req.file;

    var uid = req.body.uid;
    var wid = req.body.wid;
    var pid = req.body.pid;

    console.log(myFile);

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    console.log(originalname);
    console.log(filename);
    console.log(path);
    console.log(destination);

    for (var w in widgets) {
        if (widgets[w]._id === wgid) {
            var widget = widgets[w];
        }
    }

    widget.url = '/uploads/' + filename;

    var callbackUrl   = "/assignment/undergraduate/index.html#!/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + wgid;

    res.redirect(callbackUrl);
}

