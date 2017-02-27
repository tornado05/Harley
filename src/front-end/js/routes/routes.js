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