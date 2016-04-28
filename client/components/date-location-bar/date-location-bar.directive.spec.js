'use strict';

describe('Directive: dateLocationBar', function () {

  // load the directive's module and view
  beforeEach(module('dashboardApp'));
  beforeEach(module('components/date-location-bar/date-location-bar.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<date-location-bar></date-location-bar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the dateLocationBar directive');
  }));
});
