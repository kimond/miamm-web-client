// Declare app level module which depends on views, and components
angular.module("miammWebClient.config", []);
angular.module("miammWebClient.auth", ["miammWebClient.config"]);
angular.module("miammWebClient.menu", ["miammWebClient.config"]);

angular.module('miammWebClient', [
'ui.router',
'ngCookies',
'miammWebClient.config',
'miammWebClient.auth',
'miammWebClient.menu'
])
.controller('mainController', function ($scope, AuthService) {
    $scope.userToken = null;
    $scope.setUserToken = function (token) {
      $scope.userToken = token;
    };
})
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider

    // HOME STATES AND NESTED VIEWS
    .state('login', {
      url: '/login',
      templateUrl: 'components/auth/loginView.html',
      controller: 'LoginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'components/auth/registerView.html',
      controller: 'RegisterCtrl'
    })
    .state('home', {
      url: '/',
      templateUrl: 'components/menu/dashboardView.html',
      controller: 'dashboardCtrl'
    })

});
