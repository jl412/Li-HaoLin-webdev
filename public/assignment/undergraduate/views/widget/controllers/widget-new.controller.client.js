(function () {
    angular
        .module('WAM')
        .controller('widgetNewController',widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        //model.widgetType = $routeParams['widgetType']
        model.wgid = $routeParams['wgid'];
        //model.widgetType;

        model.createWidget = createWidget;
        model.getWidgetType = getWidgetType;

        function init() {
            model.widgets = widgetService.findWidgetsByPid(model.pid);
            //model.widget = widgetService.findWidgetById(model.wgid);
            //model.widgetType = widgetService.getWidgetType(model.wgid);
        }

        init();

        function getWidgetType(wgid) {
            widgetService.getWidgetType(wgid);
        }

        function createWidget(string) {
            var widget = {
                "pageId":model.pid,
                "widgetType":string
            }

            widgetService.createWidget(widget);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + widget._id);
        }

    }

})();
