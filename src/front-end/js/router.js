Harley.config(["$routeProvider", "$provide", function ($routeProvider, $provide) {
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
        });

    $provide.decorator('WeatherService', ["$delegate", function weatherServiceDecorator($delegate) {
        var setSelectedOptions = $delegate.getDataByService;
        var decoratedGetDataByService = function () {
            console.log('Decorator works');
            setSelectedOptions($delegate, arguments)
        };
        $delegate.getDataByService = decoratedGetDataByService;
        return $delegate;
    }])
}]);

