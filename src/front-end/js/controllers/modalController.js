Harley.controller("HarleyModalController", ["$scope", "$uibModal", function ($scope, $uibModal) {
    $scope.openModal = function () {
        console.log("Modal will be open here!!!");

        $scope.modalInstance = $uibModal.open({
            size: "sm",
            templateUrl: "views/modal.html",
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