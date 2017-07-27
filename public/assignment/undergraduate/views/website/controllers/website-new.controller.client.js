(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.uid = $routeParams['uid'];

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.uid);
        }
        init();

        // implementation
        function createWebsite(website) {
            website.developerId = model.uid;
            websiteService.createWebsite(website);
            $location.url('/user/'+model.uid+'/website');
        }
    }
})();