'use strict';

class dateLocationBarController {
 
  constructor($scope, $http, Auth, $rootScope, dateLocationService) {
      var cloud_site_id = Auth.getCurrentUser().cloud_site_id;

      dateLocationService.getLocations.success(function(locations){
        $scope.locations = locations;
        $scope.selectedLocation = $scope.locations[0];
      });


      $scope.selectLocation = function(new_location){
          dateLocationService.changeLocation(new_location);
          $scope.selectedLocation = new_location;
      }

      $scope.setDateTo = function(newDateTo){
          dateLocationService.changeDateTo(newDateTo);
      }

      $scope.setDateFrom = function(newDateFrom){
          dateLocationService.changeDateFrom(newDateFrom);
      }

      /*-------------------*/

      /*---------------dates----------------*/
      $scope.today = function() {
        $scope.dateTo = dateLocationService.filters.date_to;
        $scope.dateFrom = dateLocationService.filters.date_from;
      };
      $scope.today();

      $scope.clear = function() {
        $scope.dateTo = null;
        $scope.dateFrom = null;
      };

      $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };


      $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      };

      $scope.toggleMin();

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };

      $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
        return $scope.dt;
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.altInputFormats = ['M!/d!/yyyy'];

      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

      function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }
        return '';
      }
      /*------------------dates config ends here--------------*/

  }
}

angular.module('dashboardApp')
  .controller('dateLocationBarController', dateLocationBarController);