Harley.controller("MainController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    var initialize = function () {
        $scope['test'] = 'test 1';
        $rootScope.test = $scope["test"];
    };

    $scope.setTest = function () {
        $scope.test = 5;
        $rootScope.test = 5;
    };

    initialize();
}]);

Harley.controller("HarleyTestComponentController", ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {
    $scope.setAttr = function () {
        console.log("setAttr", $element, $attrs);
        $element.attr("data-test", "test");
    };

    $scope.getAttr = function () {
        var value = $element.attr("data-test");
        console.log("Data attribute value: ", value);
    };
}]);

Harley.controller("TestController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    var initialize = function () {
        $scope['test'] = $rootScope["test"];
    };

    initialize();
}]);



Harley.controller("HarleyController", ["$scope", "CONST", "HarleyService", "Configs", function ($scope, CONST, HarleyService, Configs) {
    console.log("Const = ", CONST);
    console.log(HarleyService.getTestValue());
    $scope.config = Configs.get({});
    console.log($scope.config);
    Configs.get({}).$promise.then(function (data) {
        console.log("Config data ", data, data.auth);
    }, function (error) {
        console.log("Config error ", error);
    });
}]);