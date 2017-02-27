/**
 * Created by andyk on 26.02.2017.
 */
Harley.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/main", {
            controller: "MainController",
            templateUrl: "pages/main.html"
        })
        .when("/test", {
            controller: "TestController",
            templateUrl: "pages/test.html"
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            resolve: {
                logincheck: checkLoggedin
            }
        })
        .otherwise({
            redirectTo: "/main"
        })
}]);

var checkLoggedin = function($q, $timeout, $rootScope, checkLogin) {
    var deferred = $q.defer();
    console.log(deferred);

    checkLogin.get({}).$promise.then(function (user) {
        $rootScope.errorMessage = null;
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        } else {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    }, function (error) {
        console.log("error checkLoggedin", error)

    });
    return deferred.promise;
};