angular.module('miammWebClient.menu', ['miammWebClient.config'])
.controller('dashboardCtrl', function ($scope, $rootScope, AuthService) {
  $rootScope.pageTitle = "Dashboard";
  $scope.test = "test";
});
