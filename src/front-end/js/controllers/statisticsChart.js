Harley.controller("statisticsChart", [
    "$rootScope", "$scope", "statisticData",
    function ($rootScope, $scope, statisticData) {
        var serviceList = [];
        $scope.configs = $rootScope.config;
        $scope.$watch('configs', function () {
            $scope.configs.$promise.then(function (data) {
                _.each(data.services, function (service) {
                    serviceList.push(service.name)
                });
            }, function (err) {
                console.log("configs error: ", err);
            })
        });
        $rootScope.$watch('statChartParams', function () {
            statisticData.get({
                periodFrom: $rootScope.statChartParams.periodFrom,
                periodTo: $rootScope.statChartParams.periodTo,
                city: $rootScope.statChartParams.city
            }).$promise.then(function (data) {
                $scope.statisticsData = data;
            }, function (err) {
                console.log("statChartParams error: ", err);
            });
        }, true);



        $scope.$watch('statisticsData', function () {
            var dataSet = [];
            _.each(serviceList, function (service) {
                dataSet.push(_getChartData(service, $rootScope.statChartParams.type));
            });
            $scope.data = dataSet;
            $scope.labels = _getTimeLabel(_.first(serviceList));
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
            _.each($scope.statisticsData, function (statistic) {
                if (statistic.sourceAPI === serviceName) {
                    _.map(statistic.stat, function (value, key){
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