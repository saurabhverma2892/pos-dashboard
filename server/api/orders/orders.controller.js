/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  update
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Orders} from '../../sqldb';
import request from 'request';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Orderss
export function index(req, res) {
  return Orders.findAll({
    where: {
      $and:{cloud_site_id: req.query.id,
            date_added: {
              $lt: req.query.date_to,
              $gt: req.query.date_from
            },
            location_id: req.query.location_id
      }
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));

    /*return request({
        headers: {
          'Authorization': req.get("Authorization"),
        },
        uri: 'http://localhost:8080/api/locations/9881',
        method: 'GET'
      }, function (err, ress, body) {
        console.log(ress);
        res.send(body);
        //it works!
      });*/
}

// Gets a single Orders from the DB
export function show(req, res) {
  console.log("chal rha hai yahan");
  return Orders.findAll({
    where: {
      $and:{cloud_site_id: req.params.id,
            data_created: {
              $lt: req.params.date_to,
              $gt: req.params.date_from
            }
      }
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Orders in the DB
export function create(req, res) {
  return Orders.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Orders in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Orders.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Orders from the DB
export function destroy(req, res) {
  return Orders.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
