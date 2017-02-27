Harley.controller("formComponentController", ["$scope", function ($scope) {
    $scope.setAttr = function () {
        console.log("text - ", $scope.text);
        console.log("search - ", $scope.search);
        console.log("email -",  $scope.email);
        console.log("url - ", $scope.url);
        console.log("tel - ", $scope.tel);
        console.log("password -",  $scope.password);
        console.log("number - ", $scope.number);
        console.log("date -",  $scope.date);
        console.log("month - ", $scope.month);
        console.log("week - ", $scope.week);
        console.log("time -",  $scope.time);
        console.log("color -",  $scope.color);
    };
}]);

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