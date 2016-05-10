'use strict';

describe('Service: apiToken', function () {

  // load the service's module
  beforeEach(module('dashboardApp'));

  // instantiate service
  var apiToken;
  beforeEach(inject(function (_apiToken_) {
    apiToken = _apiToken_;
  }));

  it('should do something', function () {
    expect(!!apiToken).toBe(true);
  });

});
