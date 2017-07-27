(function () {
    angular
        .module('WAM')
        .controller('pageEditController',pageEditController);

    function pageEditController($routeParams,
                                pageService,
                                $location) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage

        function init() {
            model.pages = pageService.findPageByWid(model.wid);
            model.page = angular.copy(pageService.findPageById(model.pid));
        }

        init();

        function createPage(website) {
            website.developerId = model.uid;
            pageService.createPage(website);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page');
        }

        function updatePage(page) {
            pageService.updatePage(model.page._id, page);
            model.message = "Page updated successfully";
        }

        function deletePage(pid) {
            pageService.deletePage(pid);
            $location.url('/user/' + model.uid + '/website/'+ model.wid + '/page');
        }

    }

})();
