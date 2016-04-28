'use strict';

angular.module('dashboardApp')
  .directive('datelocationbar', function () {
    return {
      templateUrl: 'components/date-location-bar/date-location-bar.html',
      restrict: 'EA',
      controller: 'dateLocationBarController',
      link: function (scope, element, attrs) {
      }
    };
  });
