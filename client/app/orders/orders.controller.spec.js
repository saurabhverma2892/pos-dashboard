'use strict';

describe('Component: OrdersComponent', function () {

  // load the controller's module
  beforeEach(module('dashboardApp'));

  var OrdersComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    OrdersComponent = $componentController('OrdersComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
