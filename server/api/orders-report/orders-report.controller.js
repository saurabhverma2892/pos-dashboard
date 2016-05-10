/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders-reports              ->  index
 * POST    /api/orders-reports              ->  create
 * GET     /api/orders-reports/:id          ->  show
 * PUT     /api/orders-reports/:id          ->  update
 * DELETE  /api/orders-reports/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import request from 'request';


// Gets a list of OrdersReports
export function index(req, res) {
  console.log(req.query.location_id);
  var date_to_human = new Date(req.query.date_to);
  var date_to = date_to_human.getTime()/1000;

  var date_from_human = new Date(req.query.date_from);
  var date_from = date_from_human.getTime()/1000;

  console.log(date_to);
  console.log(date_from);

  request({
        headers: {
          'token': req.get("authentication"),
        },
        uri: 'http://admin.limetray.com/crm/public/api/v2.1/reports?cloud_site_id='+req.query.id+"&from_date="+date_from+"&to_date="+date_to+"&device_id=122222222&location_ids[]="+req.query.location_id,
        method: 'GET'
      }, function (err, ress, body) {
        /*res.send(body);*/
        //it works!s
        res.send(body);
      });
}

