'use strict';

angular.module('dashboardApp')
  .service('apiToken', function ($http, base64, $cookies, $log, $location, $state) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var data = [];

    if ($cookies.get('token2') && $location.path() !== '/logout' && $cookies.get('token2') !="") {
        console.log($cookies.get('token2'));
      var apiToken = $cookies.get('token2');
    }
    else
    {
        $state.go("login");
    }
    if ($cookies.get('cloud_site_id') && $location.path() !== '/logout') {
      data.cloud_site_id = $cookies.get('cloud_site_id');
    }

    if ($cookies.get('restaurant_name') && $location.path() !== '/logout') {
      data.restaurant_name = $cookies.get('restaurant_name');
    }

    var apiLogin = function(merchcode, password){
    	var code = base64.encode(merchcode+":"+password);
        console.log(code);
    	var req = {
    	 method: 'POST',
    	 url: '/api/api-logins/',
    	 headers: {
    	   'authentication': code
    	 },
    	}
    	return $http(req);
    	
    }

    var service = {

    	apiToken: apiToken,

        data: data,

    	apiLogin: apiLogin

    }

    return service;
  });


