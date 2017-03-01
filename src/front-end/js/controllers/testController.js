Harley.controller("TestController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    var initialize = function () {
        $scope['test'] = $rootScope["test"];
    };

    initialize();
}]);