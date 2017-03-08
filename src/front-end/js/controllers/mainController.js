Harley.controller("MainController", ["$scope", "$rootScope", "Configs",
    function ($scope, $rootScope, Configs) {
        var initialize = function () {
            $rootScope.config = Configs.get({});
        };

        initialize();
    }]);