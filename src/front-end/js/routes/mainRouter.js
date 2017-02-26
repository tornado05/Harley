/**
 * Created by andyk on 26.02.2017.
 */
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