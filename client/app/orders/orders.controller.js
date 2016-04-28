'use strict';
(function(){

class OrdersComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('dashboardApp')
  .component('orders', {
    templateUrl: 'app/orders/orders.html',
    controller: OrdersComponent
  });

})();
