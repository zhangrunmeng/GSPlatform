'use strict';

describe('Controller: productCtrl', function () {

  // load the controller's module
  beforeEach(module('beacon.productModule'));

  var productCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      productCtrl = $controller('productCtrl', {
        $scope: scope
      });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
     expect(scope.test.length).toBe(3);
  });
});
