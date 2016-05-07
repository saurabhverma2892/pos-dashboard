'use strict';

angular.module('dashboardApp')
  .service('Orders', function ($rootScope, dateLocationService, $http, Auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var filters = [];

    filters.date_to = dateLocationService.filters.date_to;
    filters.date_from = dateLocationService.filters.date_from;
    filters.selectedLocation = dateLocationService.filters.location;

    $rootScope.$on( 'location.changed', function() {
    	filters.selectedLocation = dateLocationService.filters.location;
    });
    $rootScope.$on( 'date.changed', function() {
    	filters.date_to = dateLocationService.filters.date_to;
    	filters.date_from = dateLocationService.filters.date_from;
    });


    var setLocation = dateLocationService.getLocations.then(function(location){
                var selected_location = location.data[0];
                filters.selectedLocation = location.data[0];
                
                /*return $http({url:'/api/orders/',
                                         method:'GET',
                                         params:{ date_from:filters.date_from,
                                                  date_to:filters.date_to,
                                                  location_id:selected_location.location_id,
                                                  id:Auth.getCurrentUser().cloud_site_id
                                                  }});*/
            });

    var updateOrders = function(){
        return  $http({url:'/api/orders/',
                         method:'GET',
                         params:{ date_from:filters.date_from,
                                  date_to:filters.date_to,
                                  location_id:filters.selectedLocation.location_id,
                                  id:Auth.getCurrentUser().cloud_site_id
                                  }});
    }

    var order = "";
        
    /**/

    var service = {

    	filters:filters,

        setLocation: setLocation,
        
        updateOrders: updateOrders,

        orders:order

    }

    return service;
  });
