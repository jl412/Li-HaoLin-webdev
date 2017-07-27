(function () {
    angular
        .module("WAM")
        .factory("pageService", pageService);

    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ]


        var api = {
            createPage:createPage,
            findPageByWid:findPageByWid,
            findPageById:findPageById,
            updatePage:updatePage,
            deletePage:deletePage
        };

        return api;

        function createPage(page) {
            page._id = (new Date()).getTime() + "";
            pages.push(page);
            console.log(pages);
        }

        function findPageByWid(wid) {
            var resultSet = [];
            pages.forEach(function (page) {
                if(page.websiteId === wid){
                    resultSet.push(page);
                }
            });
            return resultSet;
        }

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            })
        }

        function updatePage(pid, page) {
            var oldPage = pages.find(function (page) {
                return page._id ===pid;
            });
            oldPage.name = page.name;
            oldPage.description = page.description;
        }

        function deletePage(pid) {
            var page = pages.find(function (page) {
                return page._id ===pid;
            });
            var index = pages.indexOf(page);
            pages.splice(index,1);
        }

    }
})();