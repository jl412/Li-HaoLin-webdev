(function () {
    angular
        .module('WAM')
        .config(configuration);
    
    function configuration($routeProvider) {

        $routeProvider

            .when( '/', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/login',  {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl:'views/user/templates/register.view.client.html',
                controller:"registerController",
                controllerAs:"model"
            })
            .when('/user/:uid', {
                templateUrl:'views/user/templates/profile.view.client.html',
                controller:"profileController",
                controllerAs:"model"
            })
            .when('/user/:uid/website', {
                templateUrl:'views/website/templates/website-list.view.client.html',
                controller:"websiteListController",
                controllerAs:"model"
            })
            .when('/user/:uid/website/new', {
                templateUrl:'views/website/templates/website-new.view.client.html',
                controller:"websiteNewController",
                controllerAs:"model"
            })
            .when('/user/:uid/website/:wid', {
                templateUrl:'views/website/templates/website-edit.view.client.html',
                controller:"websiteEditController",
                controllerAs:"model"
            })
            .when('/user/:uid/website/:wid/page', {
                templateUrl:'views/page/templates/page-list.view.client.html',
                controller:"pageListController",
                controllerAs:"model"
            })
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl:'views/page/templates/page-new.view.client.html',
                controller:"pageNewController",
                controllerAs:"model"
            })
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl:'views/page/templates/page-edit.view.client.html',
                controller:"pageEditController",
                controllerAs:"model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget', {
                templateUrl:'views/widget/templates/widget-list.view.client.html',
                controller:"widgetListController",
                controllerAs:"model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/chooser', {
                templateUrl:'views/widget/templates/widget-chooser.view.client.html',
                controller:"widgetNewController",
                controllerAs:"model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                templateUrl:'views/widget/templates/widget-editor.view.client.html',
                controller:"widgetEditController",
                controllerAs:"model"
            })


    }

    function checkCurrentUser($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();