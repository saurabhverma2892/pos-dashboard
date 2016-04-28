'use strict';

angular.module('dashboardApp')
  .service('dateLocationService', function ($rootScope) {
  	var service = {

  		filters: [],

  		changeLocation: function( new_location ) {
  			service.filters.location = new_location;
  	    $rootScope.$broadcast( 'location.changed' );
  		},
  		changeDateTo: function( date_to) {
  			servicefilters.dates.to = date_to;
  	    $rootScope.$broadcast( 'date.changed' );
  		},
      changeDateFrom: function( date_from) {
        service.filters.dates.from = date_from;
        $rootScope.$broadcast( 'date.changed' );
      },

  	}

  	return service;
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
