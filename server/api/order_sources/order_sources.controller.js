/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/order_sources              ->  index
 * POST    /api/order_sources              ->  create
 * GET     /api/order_sources/:id          ->  show
 * PUT     /api/order_sources/:id          ->  update
 * DELETE  /api/order_sources/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {OrderSources} from '../../sqldb';

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

// Gets a list of OrderSourcess
export function index(req, res) {
  return OrderSources.findAll({
    attributes:[
      'source_name',
      'source_id'
    ]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}