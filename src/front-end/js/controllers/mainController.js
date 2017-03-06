Harley.controller("MainController", ["$scope", "$rootScope", "Configs", function ($scope, $rootScope, Configs) {
    var initialize = function () {
        //$rootScope

        $rootScope.configs = Configs.get({});
    };

    initialize();
}]);