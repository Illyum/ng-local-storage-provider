var module = angular.module('DemoApp', ['IllyumModule']);

module.controller('DemoController', function($scope, illyumLocalStorage) {
  
  $scope.key = null;
  $scope.value = null;
  $scope.keys = null;

  $scope.putItem = function() {
    var key = $scope.key;
    var value = $scope.value;
    
    illyumLocalStorage.putItem(key, value);
  };

  $scope.getItem = function() {
    var key = $scope.key;

    $scope.value = illyumLocalStorage.getItem(key);
  };

  $scope.deleteItem = function() {
    var key = $scope.key;
    
    illyumLocalStorage.deleteItem(key);
  };

  $scope.getKeys = function() {
    var keys = illyumLocalStorage.getKeys();

    $scope.keys = keys;
  };

});