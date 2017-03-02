Harley.controller("statisticsChart", [
    "$rootScope", "$scope", '$http', 'CHART_TYPE',
    function ($rootScope, $scope, $http, CHART_TYPE) {
        var serviceList = ["openWeather", "wunderground", "darkSky"];
        $scope.statisticsData = getStatistics();
        $scope.$watch('statisticsData', function () {
            var dataSet = [];
            _.each(serviceList, function (service) {
                dataSet.push(_getChartData(service, "temp"));
            });
            $scope.data = dataSet;
            $scope.labels = _getTimeLabel("openWeather");
            $scope.series = serviceList;
        });

        function getStatistics() {
            $http({
                method: 'GET',
                url: '/weather/v01/stat/service-by-city/day?from=2017-01-01&to=2017-03-20&city=Rivne'
            }).then(function (res) {
                $scope.statisticsData = res.data;
            }, function (res) {
                console.log('Loading configs failed! Code: ', res.statusCode)
            });
        }

        var _getTimeLabel = function(serviceName) {
            var timeLabel = [];
            _.each($scope.statisticsData, function (data) {
                if (data.sourceAPI === serviceName) {
                    var date = new Date(data.date * 1000);
                    timeLabel.push(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
                }
            });
            return timeLabel;
        };

        var _getChartData = function (serviceName, chartType) {
            var data = [];
            _.each($scope.statisticsData, function (stattistic) {
                if (stattistic.sourceAPI === serviceName) {
                    _.map(stattistic.stat, function (value, key){
                        if (key === chartType) {
                            data.push(value.avg);
                        }
                    })
                }
            });
            return data;
        };
    }
]);