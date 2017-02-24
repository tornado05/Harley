var Harley = angular.module('harley', [
    "ngRoute"
]);

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

Harley.controller("TestController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    var initialize = function () {
        $scope['test'] = $rootScope["test"];
    };

    initialize();
}]);

Harley.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/main", {
            controller: "MainController",
            templateUrl: "main.html"
        })
        .when("/test", {
            controller: "TestController",
            templateUrl: "test.html"
        })
        .otherwise({
        redirectTo: "/main"
    })
}]);