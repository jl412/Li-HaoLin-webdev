(function () {
    angular
        .module('WAM')
        .controller('pageListController',pageListController);

    function pageListController($routeParams, pageService) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];


        function init() {
            model.pages =  pageService.findPageByWid(model.wid)
        }

        init();

    }

})();
