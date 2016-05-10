/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/locations              ->  index
 * POST    /api/locations              ->  create
 * GET     /api/locations/:id          ->  show
 * PUT     /api/locations/:id          ->  update
 * DELETE  /api/locations/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import request from 'request';


// Gets a single Location from the DB
export function show(req, res) {
      request({
             headers: {
               'token': req.get("authentication"),
             },
             uri: 'http://monitoring.limetray.com/mo/api/v2/site/config?cloud_site_id='+req.params.id+"&device_id=122222222",
             method: 'GET'
           }, function (err, ress, body) {
             /*res.send(body);*/
             //it works!s
             res.send(body);
           });
}