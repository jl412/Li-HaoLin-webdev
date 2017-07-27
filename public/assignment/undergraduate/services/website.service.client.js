(function () {
    angular
        .module("WAM")
        .factory("websiteService", websiteService);

    function websiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic  Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" },
            { "_id": "888", "name": "asd",       "developerId": "234", "description": "Lorem" },
            { "_id": "999", "name": "ffd",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            createWebsite:createWebsite,
            findWebsitesByUser:findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            updateWebsite:updateWebsite,
            deleteWebsite:deleteWebsite
        };

        return api;

        function createWebsite(website) {
            website._id = (new Date()).getTime() + "";
            websites.push(website);
        }

        function findWebsitesByUser(uid) {
            var resultSet = [];
            websites.forEach(function (website) {
                if(website.developerId === uid){
                    resultSet.push(website);
                }
            });
            return resultSet;
        }

        function findWebsiteById(wid) {
            return websites.find(function (website) {
                return website._id === wid;
            })
        }

        function updateWebsite(wid, newInfo) {
            var website = websites.find(function (website) {
                return website._id === wid;
            });
            website.name = newInfo.name;
            website.description = newInfo.description;
        }

        function deleteWebsite(wid) {
            var website = websites.find(function (website) {
                return website._id === wid;
            });
            var index = websites.indexOf(website);
            websites.splice(index,1);
        }
    }
})();