'use strict';

angular.module('dashboardApp')
  .service('Orders', function ($rootScope, dateLocationService, $http, Auth,apiToken) {
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
                var selected_locations = Array();
                angular.forEach(location.data.data.cities, function(cities){
                  angular.forEach(cities.outlets, function(outlet){
                    selected_locations.push(outlet.location_id);
                  });
                });
                filters.selectedLocation = selected_locations;  
            });

<<<<<<< HEAD
    var updateOrders = function(date_type){
        return  $http({url:'/api/orders/',
                         method:'GET',
                         params:{ date_from:filters.date_from,
                                  date_to:filters.date_to,
                                  location_id:filters.selectedLocation.location_id,
                                  id:Auth.getCurrentUser().cloud_site_id,
                                  date_type:date_type
                                  }});
=======

    var ordersReport = function(){
        var req = {
         method: 'GET',
         url: '/api/orders-reports/',
         headers: {
           'authentication': apiToken.apiToken
         },
         params:{ date_from:filters.date_from,
                  date_to:filters.date_to,
                  location_id:filters.selectedLocation,
                  id:apiToken.data.cloud_site_id
                }
        }

        return $http(req);

>>>>>>> ee9696fa7efb34e37f03544dec29d40cd7d4f954
    }

    var orders = "";


        
    /**/

    var service = {

    	filters:filters,

        setLocation: setLocation,
        
        updateOrders: ordersReport,

        orders:orders,

        getOrdersReport:ordersReport,

    }

    return service;
  });
