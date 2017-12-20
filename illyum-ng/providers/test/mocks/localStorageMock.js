function localStorageMock() {

  'use strict';

  var storage = {};

  Object.defineProperties(storage, {

    setItem: {
      value: function (key, value) {
        storage[key] = value;
      },
      enumerable: false,
      writable: true
    },

    getItem: {
      value: function (key) {
        return storage[key];
      },
      enumerable: false,
      writable: true
    },

    removeItem: {
      value: function (key) {
        delete storage[key];
      },
      enumerable: false,
      writable: true
    },

    length: {
      get: function () {
        var count = 0;
        for(var item in storage){
          count++;
        }
        return count;
      },
      enumerable: false
    },

    key: {
      value: function (i) {
        var keys = Object.keys(storage);
        return keys[i];
      },
      enumerable: false
    }
  });

  return storage;
}