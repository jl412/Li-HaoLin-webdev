(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams.wid;

        // event handlers
        model.createWebsite = createWebsite;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.uid);
            model.website = angular.copy(websiteService.findWebsiteById(model.wid));
        }
        init();

        // implementation
        function createWebsite(website) {
            website.developerId = model.uid;
            websiteService.createWebsite(website);
            $location.url('/user/'+model.uid+'/website');
        }

        function updateWebsite(website) {
            websiteService.updateWebsite(model.website._id, website);
            model.message = "website updated successfully";
        }

        function deleteWebsite(wid) {
            websiteService.deleteWebsite(wid);
            $location.url('/user/'+model.uid+'/website');
        }
    }
})();