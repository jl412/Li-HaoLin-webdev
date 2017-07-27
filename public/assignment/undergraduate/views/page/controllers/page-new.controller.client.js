(function () {
    angular
        .module('WAM')
        .controller('pageNewController',pageNewController);

    function pageNewController($routeParams, pageService, $location) {
        console.log("load pageNew")
        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPageByWid(model.wid);
        }

        init();

        function createPage(page) {
            page.websiteId = model.wid;
            pageService.createPage(page);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page');
        }

    }

})();
