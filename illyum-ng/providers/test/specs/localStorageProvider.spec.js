describe("illyum-ng local storage provider", function () {
  'use strict';
  
  beforeEach(module('IllyumModule', function ($provide) {
    $provide.value('$window', {
      localStorage: localStorageMock()
    });
  }));
  
  it('should put a string into the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "0", value = "Lorem ipsum";
    var spyOnSetItem = spyOn($window.localStorage, "setItem").and.callThrough();

    // Act
    illyumLocalStorage.putItem(key, value);
    
    // Assert
    var expected = value;
    var actual = $window.localStorage.getItem(key);
    expect(expected).toEqual(value);
    
    expect(spyOnSetItem).toHaveBeenCalledWith(key, angular.toJson(value));
  }));
  
  it('should put an int into the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "A", value = 10;
    var spyOnSetItem = spyOn($window.localStorage, "setItem").and.callThrough();

    // Act
    illyumLocalStorage.putItem(key, value);

    // Assert
    var expected = value;
    var actual = Number($window.localStorage.getItem(key));
    expect(expected).toEqual(value);
    
    expect(spyOnSetItem).toHaveBeenCalled();
  }));
  
  it('should put a float into the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "Math.PI", value = 3.1416;
    var spyOnSetItem = spyOn($window.localStorage, "setItem").and.callThrough();

    // Act
    illyumLocalStorage.putItem(key, value);

    // Assert
    var expected = value;
    var actual = Number($window.localStorage.getItem(key));
    expect(expected).toEqual(value);
    
    expect(spyOnSetItem).toHaveBeenCalled();
  }));
  
  it('should put an array into the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "Poets", value = ['Sor Juana Inés de la Cruz', 'Jaime Sabines', 'Manuel Acuña'];
    var spyOnSetItem = spyOn($window.localStorage, "setItem").and.callThrough();

    // Act
    illyumLocalStorage.putItem(key, value);

    // Assert
    var expected = value;
    var actual = JSON.parse($window.localStorage.getItem(key));
    expect(!!actual.shift).toBeTruthy();
    expect(actual).toEqual(expected);

    expect(spyOnSetItem).toHaveBeenCalled();
  }));
  
  it('should put an object into the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "Heisenberg", value = { name: "Walter White", age: 52, profession: "Chemical" };
    var spyOnSetItem = spyOn($window.localStorage, "setItem").and.callThrough();

    // Act
    illyumLocalStorage.putItem(key, value);

    // Assert
    var expected = value;
    var actual = JSON.parse($window.localStorage.getItem(key));
    expect(actual).toEqual(expected);
    
    expect(spyOnSetItem).toHaveBeenCalled();
  }));
  
  it('should put a null into the local storage when value is undefined', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "KeyForUndefinedValue";
    var spyOnSetItem = spyOn($window.localStorage, "setItem").and.callThrough();

    // Act
    illyumLocalStorage.putItem(key, undefined);

    // Assert
    var actual = $window.localStorage.getItem(key);
    expect(angular.fromJson(actual)).toBeNull();

    expect(spyOnSetItem).toHaveBeenCalled();
  }));
  
  it('should throw an error if the key is null', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = null;

    // Act

    // Assert
    expect(function() {
      illyumLocalStorage.putItem(key, undefined);
    }).toThrow(new Error("key cannot be null or undefined"));
  }));

  it('should throw an error if the key is undefined', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key;

    // Act

    // Assert
    expect(function() {
      illyumLocalStorage.putItem(key, undefined);
    }).toThrow(new Error("key cannot be null or undefined"));
  }));  
  
  it('should get a string from the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "1", value = "Lorem ipsum dolor sit amet";
    $window.localStorage.setItem(key, JSON.stringify(value));
    var spyOnGetItem = spyOn($window.localStorage, "getItem").and.callThrough();

    // Act
    var actual = illyumLocalStorage.getItem(key);

    // Assert
    var expected = value;
    expect(actual).toEqual(expected);
    
    expect(spyOnGetItem).toHaveBeenCalled();
  }));
  
  it('should get an int from the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "B", value = 1;
    $window.localStorage.setItem(key, JSON.stringify(value));
    var spyOnGetItem = spyOn($window.localStorage, "getItem").and.callThrough();

    // Act
    var actual = Number(illyumLocalStorage.getItem(key));

    // Assert
    var expected = value;
    expect(actual).toEqual(expected);
    
    expect(spyOnGetItem).toHaveBeenCalled();
  }));
  
  it('should get a float from the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "Math.PI", value = 3.1416;
    $window.localStorage.setItem(key, JSON.stringify(value));
    var spyOnGetItem = spyOn($window.localStorage, "getItem").and.callThrough();

    // Act
    var actual = Number(illyumLocalStorage.getItem(key));

    // Assert
    var expected = value;
    expect(actual).toEqual(expected);
    
    expect(spyOnGetItem).toHaveBeenCalled();
  }));
  
  it('should get an array from the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "Poets", value = ['Sor Juana Inés de la Cruz', 'Jaime Sabines', 'Manuel Acuña'];
    $window.localStorage.setItem(key, JSON.stringify(value));
    var spyOnGetItem = spyOn($window.localStorage, "getItem").and.callThrough();

    // Act
    var actual = illyumLocalStorage.getItem(key);

    // Assert
    var expected = value;
    expect(!!actual.shift).toBeTruthy();
    expect(actual).toEqual(expected);
    
    expect(spyOnGetItem).toHaveBeenCalled();
  }));
  
  it('should get an object from the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "Heisenberg", value = { name: "Walter White", age: 52, profession: "Chemical" };
    $window.localStorage.setItem(key, JSON.stringify(value));
    var spyOnGetItem = spyOn($window.localStorage, "getItem").and.callThrough();

    // Act
    var actual = illyumLocalStorage.getItem(key);

    // Assert
    var expected = value;
    expect(actual).toEqual(expected);

    expect(spyOnGetItem).toHaveBeenCalled();
  }));
  
  it('should get a null from the local storage for unexisting key', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "does not exist";
    var spyOnGetItem = spyOn($window.localStorage, "getItem").and.callThrough();

    // Act
    var actual = illyumLocalStorage.getItem(key);

    // Assert
    expect(actual).toBeNull();
    
    expect(spyOnGetItem).toHaveBeenCalled();
  }));
  
  it('should remove an item from the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange
    var key = "Heisenberg", value = { name: "Walter White", age: 52, profession: "Chemical" };
    $window.localStorage.setItem(key, value);
    var spyOnRemoveItem = spyOn($window.localStorage, "removeItem").and.callThrough();

    // Act
    illyumLocalStorage.deleteItem(key);
    var actual = $window.localStorage.getItem(key);

    // Assert
    expect(actual).toBeUndefined();
    
    expect(spyOnRemoveItem).toHaveBeenCalled();
  }));
  
  it('should get an array of keys of the items in the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange
    var items = [
      { key: "Item 1", value: 1 },
      { key: "Item 2", value: 2 },
      { key: "Item 3", value: 3 },
    ];

    var localStorage = $window.localStorage;
    for(var i = 0; i < items.length; i++){
      localStorage.setItem(items[i].key, items[i].value);
    }

    // Act
    var actual = illyumLocalStorage.getKeys();

    // Assert
    var expected = items;
    expect(actual.length).toEqual(expected.length);
  }));

  it('should get an empty array of keys when no item is in the local storage', inject(function($window, illyumLocalStorage) {
    // Arrange

    // Act
    var actual = illyumLocalStorage.getKeys();

    // Assert
    expect(actual.length).toBe(0);
  }));
  
});