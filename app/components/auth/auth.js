angular.module('miammWebClient.auth', ['miammWebClient.config'])
.controller('LoginCtrl', function ($scope, $rootScope, $state, AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (token) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setisAuthenticated(AuthService.isAuthenticated());
      $state.go("home");
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
})
.controller('LogoutCtrl', function ($state, $scope, AuthService) {
  AuthService.logout();
  $scope.setisAuthenticated(AuthService.isAuthenticated());
  $state.go("login");
})
.controller('RegisterCtrl', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    username: '',
    password1: '',
    password2: '',
    email: ''
  };
  $scope.register = function (credentials) {
    AuthService.register(credentials).then(function (token) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
})
.factory('AuthService', function ($http, $rootScope, $state, localStorageService, Session, SETTINGS) {
  var authService = {};

  authService.init = function() {
    var userToken = localStorageService.get("userToken")
    if(userToken){
      Session.create(userToken);
      $state.go("home");
    }
  };

  authService.login = function (credentials) {
    return $http
    .post(SETTINGS.SERVICE_URL+'/auth/login/', credentials)
    .then(function (res) {
        Session.create(res.data.key);
        localStorageService.set('userToken',res.data.key);
        return res.data.key;
      });
    };

    authService.register = function (credentials) {
      return $http
      .post(SETTINGS.SERVICE_URL+'/auth/registration/', credentials)
      .then(function (res) {
        Session.create(res.data.key);
        return res.data.key;
      });
    };

    authService.logout = function(){
      localStorageService.clearAll();
      Session.destroy();
    }

    authService.isAuthenticated = function () {
      return !!Session.userToken;
    };

    // Call constructor
    authService.init();

    return authService;
})
.service('Session', function () {
  this.create = function (userToken) {
    this.userToken = userToken;
  };
  this.destroy = function () {
    this.userToken = null;
  };
})
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
})
