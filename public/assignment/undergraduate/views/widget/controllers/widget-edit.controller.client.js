(function () {
    angular
        .module('WAM')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.wgid = $routeParams['wgid'];
        //model.widgetType = $routeParams['widgetType'];
        //model.widgetType;


        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget
        model.getWidgetType = getWidgetType;

        function init() {
            model.widgets = widgetService.findWidgetsByPid(model.pid);
            model.widget = angular.copy(widgetService.findWidgetById(model.wgid));

            model.widgetType = widgetService.getWidgetType(model.wgid);
            console.log(model.widgetType);

        }

        init();



        function getWidgetType(wgid) {
            widgetService.getWidgetType(wgid);
        }

        function updateWidget(widget) {
            widgetService.updateWidget(model.widget._id, widget);
            model.message = "widget updated successfully";
        }

        function deleteWidget(wgid) {
            widgetService.deleteWidget(wgid)
            $location.url('/user/' + model.uid + '/website/'+ model.wid + '/page/' + model.pid + '/widget');
        }

    }

})();
