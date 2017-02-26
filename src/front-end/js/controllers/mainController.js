Harley.controller("MainController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    var initialize = function () {
        $scope['test'] = 'test 1';
        $rootScope.test = $scope["test"];
    };

    $scope.setTest = function () {
        $scope.test = 5;
        $rootScope.test = 5;
    };

    initialize();
}]);