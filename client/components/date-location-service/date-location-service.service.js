'use strict';

angular.module('dashboardApp')
  .service('dateLocationService', function ($rootScope, Auth, $http, $q) {

    var filters = [];
    filters.date_to = new Date()
    filters.date_from = new Date(2013,1,22);
    var locations = $http.get('/api/locations/'+Auth.getCurrentUser().cloud_site_id);

  	var service = {

      getLocations: locations,

  		filters: filters,

  		changeLocation: function( new_location ) {
        console.log("changing location");
  			service.filters.location = new_location;
  	    $rootScope.$broadcast( 'location.changed' );
  		},
  		changeDateTo: function( date_to ) {
        console.log("changing data to");
  			service.filters.date_to = date_to;
  	    $rootScope.$broadcast( 'date.changed' );
  		},
      changeDateFrom: function( date_from ) {
        console.log("changing data from");
        service.filters.date_from = date_from;
        $rootScope.$broadcast( 'date.changed' );
      },

  	}

  	return service;
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
