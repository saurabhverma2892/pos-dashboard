'use strict';
(function(){

class DashboardviewComponent {
  constructor($scope, $http, Auth, Orders) {
    
    $scope.log1 = [ [ 10, 100] , [20,20] , [ 30 , 500] , [ 40 , 100] , [ 50 , 175] , [ 60 , 400] , [ 70 , 900] ];
    
       /* console.log(Orders.getOrders);
      Orders.getOrders.then(function(data){
        $scope.orders = data;
        console.log($scope.orders);
      });*/

      $scope.orders = Orders.orders;

      Orders.getOrdersReport.success(function(data){
        console.log(data);
      })

      var updateOrders = function(){
          Orders.updateOrders().success(function(data){
             $scope.orders = data;
             Orders.orders = data;


             $scope.bar1 = [];
             angular.forEach($scope.orders, function(order){
               $scope.bar1.push([order.date_added, order.order_amount])

             });
             
             $scope.log1 = $scope.bar1;

             $scope.data = [
                 {
                     "key" : "Quantity" ,
                     "bar": true,
                     "values" : $scope.log1
                 }
                           ].map(function(series) {
                                     series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
                                     return series;
                                 });

           });
      }

      if($scope.orders == ""){
          Orders.setLocation.then(function(){
              updateOrders();
          }) 
      }
      $scope.$on( 'location.changed', function() {
             updateOrders();
            });

      $scope.$on( 'date.changed', function() {
          updateOrders();
      });















    $scope.getTotalRevenue = function(){
        var total = 0;
        console.log();
        for(var i = 0; i < $scope.orders.length; i++){
            var order_amount = $scope.orders[i].order_amount;
            total += order_amount;
        }
        return total;
    }

    $scope.getTotalNumber = function(){
      return $scope.orders.length;
    }

    /* Chart options */

    /* Chart data */

    $scope.options = {
                chart: {
                    type: 'linePlusBarChart',
                    height: 500,
                    margin: {
                        top: 30,
                        right: 75,
                        bottom: 50,
                        left: 75
                    },
                    /*bars: {
                        forceY: [0]
                    },
                    bars2: {
                        forceY: [0]
                    }, */

                    color: ['#2ca02c', 'darkred'],
                    x: function(d,i) { return i },
                    xAxis: {
                        axisLabel: 'X Axis',
                        tickFormat: function(d) {
                            var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                            if (dx > 0) {
                                return d3.time.format('%x')(new Date(dx))
                            }
                            return null;
                        }
                    }, 
                    x2Axis: {
                        tickFormat: function(d) {
                            var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                            return d3.time.format('%d-%b-%Y')(new Date(dx))
                        },
                        showMaxMin: false
                    }, /*
                    y1Axis: {
                        axisLabel: 'Y1 Axis',
                        tickFormat: function(d){
                            return d3.format(',f')(d);
                        },
                        axisLabelDistance: 12
                    },
                    y2Axis: {
                        axisLabel: 'Y2 Axis',
                        tickFormat: function(d) {
                            return '$' + d3.format(',.2f')(d)
                        }
                    },
                    y3Axis: {
                        tickFormat: function(d){
                            return d3.format(',f')(d);
                        }
                    },
                    y4Axis: {
                        tickFormat: function(d) {
                            return '$' + d3.format(',.2f')(d)
                        }
                    }*/
                }
            };

    $scope.data = [
        {
            "key" : "Quantity" ,
            "bar": true,
            "values" : $scope.log1
        }
    /*,
        {
            "key" : "Price" ,
            "values" : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51] , [ 1141102800000 , 68.49] , [ 1143781200000 , 62.72] , [ 1146369600000 , 70.39] , [ 1149048000000 , 59.77] , [ 1151640000000 , 57.27] , [ 1154318400000 , 67.96] , [ 1156996800000 , 67.85] , [ 1159588800000 , 76.98] , [ 1162270800000 , 81.08] , [ 1164862800000 , 91.66] , [ 1167541200000 , 84.84] , [ 1170219600000 , 85.73] , [ 1172638800000 , 84.61] , [ 1175313600000 , 92.91] , [ 1177905600000 , 99.8] , [ 1180584000000 , 121.191] , [ 1183176000000 , 122.04] , [ 1185854400000 , 131.76] , [ 1188532800000 , 138.48] , [ 1191124800000 , 153.47] , [ 1193803200000 , 189.95] , [ 1196398800000 , 182.22] , [ 1199077200000 , 198.08] , [ 1201755600000 , 135.36] , [ 1204261200000 , 125.02] , [ 1206936000000 , 143.5] , [ 1209528000000 , 173.95] , [ 1212206400000 , 188.75] , [ 1214798400000 , 167.44] , [ 1217476800000 , 158.95] , [ 1220155200000 , 169.53] , [ 1222747200000 , 113.66] , [ 1225425600000 , 107.59] , [ 1228021200000 , 92.67] , [ 1230699600000 , 85.35] , [ 1233378000000 , 90.13] , [ 1235797200000 , 89.31] , [ 1238472000000 , 105.12] , [ 1241064000000 , 125.83] , [ 1243742400000 , 135.81] , [ 1246334400000 , 142.43] , [ 1249012800000 , 163.39] , [ 1251691200000 , 168.21] , [ 1254283200000 , 185.35] , [ 1256961600000 , 188.5] , [ 1259557200000 , 199.91] , [ 1262235600000 , 210.732] , [ 1264914000000 , 192.063] , [ 1267333200000 , 204.62] , [ 1270008000000 , 235.0] , [ 1272600000000 , 261.09] , [ 1275278400000 , 256.88] , [ 1277870400000 , 251.53] , [ 1280548800000 , 257.25] , [ 1283227200000 , 243.1] , [ 1285819200000 , 283.75] , [ 1288497600000 , 300.98] , [ 1291093200000 , 311.15] , [ 1293771600000 , 322.56] , [ 1296450000000 , 339.32] , [ 1298869200000 , 353.21] , [ 1301544000000 , 348.5075] , [ 1304136000000 , 350.13] , [ 1306814400000 , 347.83] , [ 1309406400000 , 335.67] , [ 1312084800000 , 390.48] , [ 1314763200000 , 384.83] , [ 1317355200000 , 381.32] , [ 1320033600000 , 404.78] , [ 1322629200000 , 382.2] , [ 1325307600000 , 405.0] , [ 1327986000000 , 456.48] , [ 1330491600000 , 542.44] , [ 1333166400000 , 599.55] , [ 1335758400000 , 583.98]]
        }*/
    ].map(function(series) {
            series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
            return series;
        });












   /* var i = 0;
    $scope.bar1 = [];
    angular.forEach($scope.orders, function(order){
      $scope.bar1.push([i, order.order_amount])

      i=i+50;
    });
    
    $scope.log1 = $scope.bar1;

    $scope.data = [
        {
            "key" : "Quantity" ,
            "bar": true,
            "values" : $scope.log1
        }
                  ].map(function(series) {
                            series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
                            return series;
                        });



*/








  }

  
}

angular.module('dashboardApp')
  .component('dashboardview', {
    templateUrl: 'app/dashboardview/dashboardview.html',
    controller: DashboardviewComponent
  });

})();
