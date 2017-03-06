Harley.controller("AuthModalController", ["$scope", "$uibModal", "LoginFactory", "SignupFactory", "$rootScope",
    function ( $scope, $uibModal, LoginFactory, SignupFactory, $rootScope ) {
    $scope.authModalOpen = function () {
        $scope.modalInstance = $uibModal.open({
            size: "sm",
            templateUrl: "views/authModal.html",
            controller: ["$scope", "$uibModalInstance", function ($scope, $uibModalInstance) {
                $scope.ok = function () {
                    console.log($scope.modalText);
                    $uibModalInstance.close({modalText: $scope.modalText});
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };

                $scope.login = function (user) {
                    LoginFactory.post(user).$promise.then(function (data) {
                        console.log("lofin data", data);
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
                        console.log("loggin error", err);
                    });
                };

                $scope.signup = function(user) {
                    // TODO: notify if user passwords are not the same
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
                            console.log("SignUpCtrl", error);
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

        $rootScope.$watch('currentUser', function () {
            console.log($rootScope.currentUser);
        });

        $scope.modalInstance.result.then(function (data) {
            $scope.modalText = data["modalText"];
        }, function () {
            console.log("Reject");
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

Harley.controller("NavCtrl", ["$scope", "$rootScope", "$location", "$http", function($rootScope, $scope, $http, $location) {
    $scope.logout = function() {
        $http.post("/logout")
            .success(function() {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
    }
}]);

Harley.controller("SignUpCtrl", ["$scope", "$rootScope", "$location", "$http", "SignupFactory", function($scope, $http, $rootScope, $location, SignupFactory) {
    $scope.signup = function(user) {
        // TODO: notify if user passwords are not the same
        if (user.password == user.password2) {
            SignupFactory.post(user).$promise.then(function (data) {
                $rootScope.currentUser = user;
            }, function (error) {
                console.log("SignUpCtrl", error);
            });
        }
    }
}]);

Harley.controller("LoginCtrl", ["$scope", "$rootScope", "$location", "$http", "LoginFactory", function($location, $scope, $http, $rootScope, LoginFactory) {
    $scope.login = function (user) {
        LoginFactory.post(user).then(function (data) {
            console.log("LoginCtrl", data);
        }, function (error) {
            console.log("LoginCtrl error", error);
        });
    };
}]);