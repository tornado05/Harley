Harley.controller("currentChartController", [
    "$rootScope", "$scope", '$http', 'WeatherService',
    function ($rootScope, $scope, $http, WeatherService) {
        $rootScope.$watch('currentWeather', function (){
            $scope.labels = WeatherService.getWeatherServices($rootScope.currentWeather);
            $scope.data = [];

        });
        $scope.cities = [
            {
                label: 'Rivne',
                value: 'Rivne'
            },
            {
                label: 'Kiev',
                value: 'Kiev'
            },
            {
                label: 'Luts`k',
                value: 'Luts`k'
            }

        ];
        $scope.params = [
            {
                label: 'Temperature',
                value: 'temp'
            },
            {
                label: 'Pressure',
                value: 'pressure'
            },
            {
                label: 'Humidity',
                value: 'humidity'
            },
            {
                label: 'Wind speed',
                value: 'huwindSpeed'
            }
        ];
        $scope.selectedCity = _.first($scope.cities);
        $scope.selectedParam = _.first($scope.params);
        $scope.updateChart = function (){

        };

        var setChartData = function (city, param){
            var result = [];
            _.each($rootScope.currentWeather, function (item){
                if (item.cityName === city){
                    result.push(item[param])
                }
            });
            return result;
        };

        $scope.labels = ['API', 'API', 'API'];
        $scope.series = ['SERIES'];
        $scope.data = [
            [65, 59, 80]
        ];
        $scope.options = {
            scales: {

            }
        }
    }
]);