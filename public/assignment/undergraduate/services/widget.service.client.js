(function () {
    angular
        .module("WAM")
        .factory("widgetService", widgetService);

    function widgetService() {

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


        var api = {
            createWidget:createWidget,
            findWidgetsByPid:findWidgetsByPid,
            findWidgetById:findWidgetById,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget,
            getWidgetType:getWidgetType
        };

        return api;

        function createWidget(widget) {
            widget._id = (new Date()).getTime() + "";
            widgets.push(widget);
            console.log(widgets);
        }

        function findWidgetsByPid(pid) {
            var resultSet = [];
            widgets.forEach(function (widget) {
                if(widget.pageId === pid){
                    resultSet.push(widget);
                }
            });

            return resultSet;
        }

        function findWidgetById(wgid) {
            return widgets.find(function (widget) {
                return widget._id === wgid;
            })
        }

        function updateWidget(wgid, newInfo) {
            var widget = widgets.find(function (widget) {
                return widget._id === wgid;
            });
            widget.name = newInfo.name;
            widget.text = newInfo.text;
            widget.size = newInfo.size;
            widget.width = newInfo.width;
            widget.url = newInfo.url;
        }

        function deleteWidget(wgid) {
            var widget = widgets.find(function (widget) {
                return widget._id ===wgid;
            });
            var index = widgets.indexOf(widget);
            widgets.splice(index,1);
        }

        function getWidgetType(wgid) {
            var widget = widgets.find(function (widget) {
                return widget._id ===wgid;
            });

            return widget.widgetType;
        }
    }
})();