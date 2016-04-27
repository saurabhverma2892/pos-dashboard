'use strict';

angular.module('dashboardApp.auth', [
  'dashboardApp.constants',
  'dashboardApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
