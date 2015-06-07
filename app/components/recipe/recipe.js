angular.module('miammWebClient.recipe', ['miammWebClient.config'])
.controller('recipeListCtrl', function ($scope, $rootScope, recipeService) {
  $rootScope.pageTitle = "Recipe list";
  $scope.recipeList = recipeService.list();
})
.controller('recipeAddCtrl', function ($scope, $rootScope, recipeService) {
  $rootScope.pageTitle = "Add a recipe";
  $scope.ingredients = [];
  $scope.steps = [];
  $scope.addIngredientField = function() {
    $scope.ingredients.push('');
  }
  $scope.removeIngredientField = function(index) {
    $scope.ingredients.splice(index,1);
  }
  $scope.addStepField = function() {
    $scope.steps.push('');
  }
  $scope.removeStepField = function(index) {
    $scope.steps.splice(index,1);
  }
  $scope.addRecipe = function(recipe){
      recipeService.add(recipe);
  }
})
.factory('recipeService', function ($http, $rootScope, $state, localStorageService, Session, SETTINGS) {
  var recipeService = {};


  recipeService.list = function() {
    return $http
    .get(SETTINGS.SERVICE_URL+'/recipes/')
    .then(function (res) {
      return res.data;
    });
  };

  recipeService.add = function(recipe){
      serializedRecipe = angular.toJson(recipe);
      return $http
      .post(SETTINGS.SERVICE_URL+'/recipes/', serializedRecipe)
  };

  return recipeService;
});
