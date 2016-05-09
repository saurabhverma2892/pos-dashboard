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
 request({
          headers: {
            'token': 'f8c511ccac60ba544c69b63f09c2226b',
          },
          uri: 'http://admin.limetray.com/crm/public/api/v2.1/reports?cloud_site_id=2339&from_date=1273412034&to_date=1462800988&device_id=122222222',
          method: 'GET'
        }, function (err, ress, body) {
          /*res.send(body);*/
          //it works!
          res.send(body);
        });
  
}

// Gets a single OrdersReport from the DB
export function show(req, res) {
  return OrdersReport.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
