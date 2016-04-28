'use strict';

describe('Service: dateLocationService', function () {

  // load the service's module
  beforeEach(module('dashboardApp'));

  // instantiate service
  var dateLocationService;
  beforeEach(inject(function (_dateLocationService_) {
    dateLocationService = _dateLocationService_;
  }));

  it('should do something', function () {
    expect(!!dateLocationService).toBe(true);
  });

});
