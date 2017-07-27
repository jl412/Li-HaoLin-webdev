(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.uid = $routeParams['uid'];

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.uid);
        }
        init();
    }
})();