Harley.controller("MainController", ["$scope", "$rootScope", "Configs", 'WeatherData',
    function ($scope, $rootScope, Configs, WeatherData) {
        var initialize = function () {
            $rootScope.config = Configs.get({});
            $rootScope.weatherData = WeatherData.get({});
            $rootScope.currentWeather = true;
            $rootScope.statisticWeather = false;
        };

        initialize();
    }]);