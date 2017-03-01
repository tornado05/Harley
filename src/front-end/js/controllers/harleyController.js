Harley.controller("HarleyController", ["$scope", "CONST", "HarleyService", "Configs", function ($scope, CONST, HarleyService, Configs) {
    console.log("Const = ", CONST);
    console.log(HarleyService.getTestValue());
    // this won't work
    //console.log(HarleyService.innerFuction());

    $scope.config = Configs.get({});
    console.log($scope.config);
    Configs.get({}).$promise.then(function (data) {
        console.log("Config data ", data, data.auth);
    }, function (error) {
        console.log("Config error ", error);
    });
}]);