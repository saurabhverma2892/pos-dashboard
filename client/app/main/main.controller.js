'use strict';

(function() {

class MainController {

  constructor($http, $scope, $state, Auth, $log) {

    var loggedIn = Auth.isLoggedIn();
    if(loggedIn)
    {
      $state.go("dashboard.dashboardview");
    }
    else
    {
      $state.go("login");
    }
  }
}

angular.module('dashboardApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
