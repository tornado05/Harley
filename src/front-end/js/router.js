Harley.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/main", {
            controller: "MainController",
            templateUrl: "index.html"
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            resolve: {
                // logincheck: CheckLoggedInService.checkLoggedIn()
            }
        })
        .otherwise({
            redirectTo: "/main"
        })
}]);

