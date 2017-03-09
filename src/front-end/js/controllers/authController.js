Harley.controller("AuthModalController", ["$scope", "$uibModal", "LoginFactory", "SignupFactory", "$rootScope",
    function ( $scope, $uibModal, LoginFactory, SignupFactory, $rootScope ) {
    $scope.authModalOpen = function () {
        $scope.modalInstance = $uibModal.open({
            size: "sm",
            templateUrl: "views/authModal.html",
            controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                $scope.ok = function () {
                    $uibModalInstance.close({modalText: $scope.modalText});
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                $scope.login = function (user) {
                    LoginFactory.post(user).$promise.then(function (data) {
                        if (data.alert) {
                            $scope.alerts = [
                                { type: 'danger', msg: data.alert }
                            ];
                        } else {
                            $uibModalInstance.dismiss();
                        }
                        $scope.closeAlert = function(index) {
                            $scope.alerts.splice(index, 1);
                        };
                    }, function (err) {
                        console.log("logIn error", err);
                    });
                };

                $scope.signup = function(user) {
                    if (user.password == user.password2) {
                        SignupFactory.post(user).$promise.then(function (data) {
                            if (data.alert) {
                                $scope.alerts = [
                                    { type: 'danger', msg: data.alert }
                                ];
                            } else {
                                $uibModalInstance.dismiss();
                            }
                            $scope.closeAlert = function(index) {
                                $scope.alerts.splice(index, 1);
                            };
                            $rootScope.currentUser = user;
                        }, function (error) {
                            console.log("SignUpCtrl error: ", error);
                        });
                    } else {
                        $scope.alerts = [
                            { type: 'danger', msg: "Passwords do not match" }
                        ];
                        $scope.closeAlert = function(index) {
                            $scope.alerts.splice(index, 1);
                        };
                    }
                }
            }]
        });

        $scope.modalInstance.result.then(function (data) {
            $scope.modalText = data["modalText"];
        }, function () {

        });

        $scope.login = function (user) {
            LoginFactory.post(user);
        };

        $scope.tabs = [
            { title:'Dynamic Title 1', content:'Dynamic content 1' },
            { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
        ];
        $scope.model = {
            name: 'Tabs'
        };
    };
}]);
