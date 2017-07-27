(function () {
    angular
        .module('WAM')
        .controller('profileController',profileController);

    function profileController($location,
                               $routeParams,
                               userService ) {

        var model = this;
        var uid = $routeParams["uid"];

        model.update = updateUser;


        function logout() {
            userService.logout();
            $location.url('/login');
        }

        function deleteUser(user) {
            userService.deleteUser(user._id);
            $location.url('/login');
        }

        function updateUser(user) {
            userService
                .updateUser(model.user._id, user);
                    model.message = "User updated successfully";
        }

        function init() {
            model.user = angular.copy(userService.findUserById(uid));
        }
        init();



    }

})();
