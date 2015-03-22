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
      controller: 'dashboardCtrl',
      authenticate: true
    });

    $urlRouterProvider.otherwise('/');
})
.run(function($rootScope, $state, AuthService) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if(toState.authenticate && !AuthService.isAuthenticated()){
      // User isn’t authenticated
      $state.transitionTo("login");
      event.preventDefault();
    }
  });
});
