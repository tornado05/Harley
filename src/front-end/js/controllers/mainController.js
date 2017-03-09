Harley.controller("MainController", ["$scope", "$rootScope", "Configs",
    function ($scope, $rootScope, Configs) {
        var initialize = function () {
            $rootScope.config = Configs.get({});
            $rootScope.statChartParams = {
                periodFrom: "2017-01-01",
                periodTo: "2017-01-20",
                city: "Rivne",
                type: "temp"
            };
        };



        initialize();
    }]);