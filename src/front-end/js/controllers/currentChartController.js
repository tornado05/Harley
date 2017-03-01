Harley.controller("currentChartController", [
    "$rootScope", "$scope", '$http', 'WeatherService',
    function ($rootScope, $scope, $http, WeatherService) {
        var initialize = function () {
            angular.extend($scope, {
                labels: [],
                data: [],
                options: {},
                cities: [{
                    label: "city",
                    value: "city"
                }],
                params: [{
                    label: 'value',
                    value: 'value'
                }]
            });
            getConfigs();
            setSelectedOptions();
        };

        $rootScope.$watch('currentWeather', function () {
            $scope.updateChart();
        });

        var getConfigs = function () {
            $http({
                method: 'GET',
                url: '/weather/v01/configs'
            }).then(function (res) {
                $scope.cities = res.data.cities;
                $scope.params = res.data.params;
                setSelectedOptions();
            }, function (res) {
                console.log('Loading configs failed! Code: ', res.statusCode)
            });
        };

        var setSelectedOptions = function () {
            $scope.selectedCity = _.first($scope.cities).value;
            $scope.selectedParam = _.first($scope.params).name;
        };

        $scope.updateChart = function () {
            $scope.labels = [];
            $scope.data = [];
            $scope.options = updateChartOptions();
            _.each($rootScope.currentWeather, function (data) {
                if ((data.cityName == $scope.selectedCity)) {
                    $scope.labels.push(data.sourceAPI);
                    $scope.data.push(data[$scope.selectedParam])
                }
            });
        };

        var getTicksByParam = function () {
            var result = {};
            result.beginAtZero = true;
            _.each($scope.params, function (param) {
                if (param.name === $scope.selectedParam) {
                    result.max = param.max;
                    result.min = param.min;
                    $scope.series = param.label;
                }
            });
            return result;
        };

        var updateChartOptions = function () {
            return {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: getTicksByParam()
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };

        initialize();
    }
]);