Harley.controller("MainController", ["$scope", "$rootScope", "Configs", "WeatherData",
    function ($scope, $rootScope, Configs, WeatherData) {
        var initialize = function () {
            $rootScope.config = Configs.get({});
            $rootScope.weatherData = WeatherData.get({});
            $rootScope.currentWeather = true;
            $rootScope.statisticWeather = false;
            $rootScope.errorMessage = null;
            $rootScope.statChartParams = {
                periodFrom: "2017-01-01",
                periodTo: "2017-01-20",
                city: "Rivne",
                type: "temp"
            };

        };

        initialize();
    }]);