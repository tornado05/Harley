var Harley = angular.module('harley', [
    "ngRoute",
    "ui.bootstrap",
    "ngResource"
]);

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

Harley.controller("TestController", ["$scope", "$rootScope", function ($scope, $rootScope) {
    var initialize = function () {
        $scope['test'] = $rootScope["test"];
    };

    initialize();
}]);

Harley.controller("HarleyModalController", ["$scope", "$uibModal", function ($scope, $uibModal) {
    $scope.openModal = function () {
        console.log("Modal will be open here!!!");

        $scope.modalInstance = $uibModal.open({
            size: "sm",
            templateUrl: "modal.html",
            controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                console.log($uibModalInstance);
                $scope.ok = function () {
                    console.log($scope.modalText);
                    $uibModalInstance.close({modalText: $scope.modalText});
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
            }]
        });

        $scope.modalInstance.result.then(function (data) {
            console.log("Ok");
            console.log(data);
            $scope.modalText = data["modalText"];
        }, function () {
            console.log("Reject");
        });
    };
}]);

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

Harley.factory("Configs", ["$resource", function ($resource) {
    return $resource("/weather/v01/configs", {}, {
        'get': {
            method: "GET"
        }
    });
}]);

Harley.service("HarleyService", ["CONST", function (CONST) {
    var innerFuction = function () {
        return CONST;
    };

    this.getTestValue = function () {
        return innerFuction();
    };
}]);

Harley.component("formComponent", {
    controller: "formComponentController",
    templateUrl: "form_component.html"
});

Harley.constant("CONST", "test const");

Harley.controller("formComponentController", ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {
    $scope.setAttr = function () {
        console.log("name - ", $scope.name);
        console.log("username - ", $scope.username);
        console.log("remember me -",  $scope.checked);
    };
}]);

Harley.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/main", {
            controller: "MainController",
            templateUrl: "main.html"
        })
        .when("/test", {
            controller: "TestController",
            templateUrl: "test.html"
        })
        .otherwise({
        redirectTo: "/main"
    })
}]);