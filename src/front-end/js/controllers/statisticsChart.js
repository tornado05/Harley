Harley.controller("statisticsChart", [
    "$rootScope", "$scope", "statisticData",
    function ($rootScope, $scope, statisticData) {
        var serviceList = ["openWeather", "wunderground", "darkSky"];

        statisticData.get({
            periodFrom: "2017-01-01",
            periodTo: "2017-01-20",
            city: "Rivne"
        }).$promise.then(function (data) {
            $scope.statisticsData = data;
        }, function (err) {
            console.log(err);
        });

        $scope.$watch('statisticsData', function () {
            var dataSet = [];
            _.each(serviceList, function (service) {
                dataSet.push(_getChartData(service, "temp"));
            });
            $scope.data = dataSet;
            $scope.labels = _getTimeLabel("openWeather");
            $scope.series = serviceList;
        });

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