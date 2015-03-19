// Declare app level module which depends on views, and components
angular.module("miammWebClient.config", []);
angular.module("miammWebClient.auth", ["miammWebClient.config"]);
angular.module("miammWebClient.menu", ["miammWebClient.config"]);

angular.module('miammWebClient', [
'ui.router',
'ngCookies',
'LocalStorageModule',
'miammWebClient.config',
'miammWebClient.auth',
'miammWebClient.menu'
])
.controller('mainController', function ($scope, AuthService) {
    $scope.isAuthenticated = AuthService.isAuthenticated();
    $scope.setisAuthenticated = function(value){
      $scope.isAuthenticated = value;
    }
})
.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

  // Local storage config
  localStorageServiceProvider
  .setPrefix('miamm');

  $urlRouterProvider.otherwise('/login');

  $stateProvider

    // HOME STATES AND NESTED VIEWS
    .state('login', {
      url: '/login',
      templateUrl: 'components/auth/loginView.html',
      controller: 'LoginCtrl'
    })
    .state('logout', {
      url: '/logout',
      templateUrl: 'components/auth/loginView.html',
      controller: 'LogoutCtrl'
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
