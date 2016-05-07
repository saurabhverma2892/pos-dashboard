'use strict';

angular.module('dashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.dashboardview', {
      	
        url: '/main',
        template: '<dashboardview></dashboardview>',
        /*resolve:{
        	'all_location': function(dateLocationService) {
        		console.log("resolve is working here");
        		return dateLocationService.promise;
        	}

        }*/
      });
  });
