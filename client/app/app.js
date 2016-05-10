'use strict';

angular.module('dashboardApp', [
  'dashboardApp.auth',
  'dashboardApp.admin',
  'dashboardApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'nvd3',
  'ab-base64'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
