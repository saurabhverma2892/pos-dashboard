'use strict';

describe('Service: orders', function () {

  // load the service's module
  beforeEach(module('dashboardApp'));

  // instantiate service
  var orders;
  beforeEach(inject(function (_orders_) {
    orders = _orders_;
  }));

  it('should do something', function () {
    expect(!!orders).toBe(true);
  });

});