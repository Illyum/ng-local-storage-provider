(function () {

  'use strict';

  var module = angular.module("IllyumModule", []);

  module.provider("illyumLocalStorage", function () {

    this.$get = ['$window', function ($window) {

      var putItem = function (key, value) {

        if (key === null || angular.isUndefined(key)) {
          throw new Error("key cannot be null or undefined");
        }

        if (angular.isUndefined(value)) {
          value = null; // null is more consistent than undefined
        }

        $window.localStorage.setItem(key, angular.toJson(value));
      };

      var getItem = function (key) {
        var value = $window.localStorage.getItem(key);

        if (angular.isUndefined(value)) {
          return null;
        }

        return angular.fromJson(value);
      };

      var deleteItem = function (key) {
        $window.localStorage.removeItem(key);
      };

      var getKeys = function () {
        var keys = [];
        var localStorage = $window.localStorage;
        var length = localStorage.length;

        for (var i = 0; i < length; i++) {
          var key = localStorage.key(i);
          keys.push(key);
        }

        return keys;
      };

      return {
        putItem: putItem,
        getItem: getItem,
        deleteItem: deleteItem,
        getKeys: getKeys
      };

    }];

  });

}());