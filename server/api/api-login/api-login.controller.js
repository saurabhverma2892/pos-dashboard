/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/api-logins              ->  index
 * POST    /api/api-logins              ->  create
 * GET     /api/api-logins/:id          ->  show
 * PUT     /api/api-logins/:id          ->  update
 * DELETE  /api/api-logins/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import request from 'request';


// Gets a list of ApiLogins
export function index(req, res) {

    console.log(req.get("authentication"));
    request({
             headers: {
               'authentication': req.get("authentication"),
             },
             form: {device_id: 122222222,
                    app_type: 2,
                    device_info: 'device_info',
                    model: 'device model',
                    os_api: 'os api level',
                    os_version: 'os version',
                    app_version: 'v2.1'
                   },
             uri: 'http://monitoring.limetray.com/mo/api/v2.1/login/merch',
             method: 'POST'
           }, function (err, ress, body) {
             /*res.send(body);*/
             //it works!s
             res.send(body);
           });
}
