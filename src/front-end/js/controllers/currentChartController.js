Harley.controller("currentChartController", [
    "$rootScope", "$scope", 'WeatherService',
    function ($rootScope, $scope, WeatherService) {
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
            toggleControls();
            setSelectedOptions();
            setChartColors();
        };

        $rootScope.$watch('currentWeather', function () {
            $scope.updateChart();
        });

        $rootScope.$watch('config', function () {
            $rootScope.config.$promise.then(function (config) {
                setSelectedOptions(config);
                $scope.cities = config.cities;
                $scope.params = config.params;
            }, function (res) {
                console.log("Failed to receive config. Code:", res.statusCode);
            });

        });

        var setSelectedOptions = function (config) {
            $scope.selectedCity = _.first(config.cities).value;
            $scope.selectedParam = _.first(config.params).name;
        };

        var setChartColors = function (){
            //TODO: redo this according to cities and configs;
            $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
        };

        var toggleControls = function () {
            $scope.controls = _.isEmpty($rootScope.statWeather) ? '' : 'hidden';
        };

        $scope.updateChart = function () {
            $scope.labels = [];
            $scope.data = [];
            $scope.options = updateChartOptions();
            _.each($rootScope.currentWeather, function (data) {
                if ((data.cityName == $scope.selectedCity)) {
                    $scope.labels.push(data.sourceAPI);
                    $scope.data.push(data[$scope.selectedParam]);
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