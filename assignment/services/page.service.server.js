var app = require('../../express');

app.post('/api/assignment/user/:uid/website/:wid/page', createPage);
app.get('/api/assignment/user/:uid/website/:wid/page/:pid', findPageById);
app.get('/api/assignment/user/:uid/website/:wid/page', findPageByWid);
app.put('/api/assignment/user/:uid/website/:wid/page/:pid', updatePage);
app.delete('/api/assignment/user/:uid/website/:wid/page/:pid', deletePage);


var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
]


function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.send(page);
}

function findPageById(req, res) {
    var uid =  req.params['uid'];
    var wid =  req.params['wid'];
    var pid =  req.params['pid'];
    var page = pages.find(function (page) {
        return page._id === pid;
    });
    res.send(page);
}

function findPageByWid(req, res) {
    var resultSet = [];
    for(var p in pages){
        if(pages[p].websiteId === req.params.wid){
            resultSet.push(pages[p]);
        }
    }
    res.json(resultSet);
}

function updatePage(req, res) {
    var page = req.body;
    var uid = req.params.uid;
    var wid = req.params.wid;
    var pid = req.params.pid;
    for (var p in pages){
        if(pid === pages[p]._id){
            pages[p].name = page.name;
            pages[p].description = page.description;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {

    var pid = req.params.pid;
    var page = pages.find(function (page) {
        return page._id ===pid;
    });
    var index = pages.indexOf(page);
    pages.splice(index,1);
    res.sendStatus(200);
}