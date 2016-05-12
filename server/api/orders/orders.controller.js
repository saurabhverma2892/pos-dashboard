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
import sequelize from 'sequelize';

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
    attributes: [
      [sequelize.fn('SUM', sequelize.col('order_amount')), 'revenue'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'orders_count'],
      [sequelize.fn(req.query.date_type, sequelize.col('date_added')), 'date']
    ],
    where: {
      $and:{cloud_site_id: req.query.id,
            date_added: {
              $lt: req.query.date_to,
              $gt: req.query.date_from
            },
            location_id: req.query.location_id
      }
    },
    group:[sequelize.fn(req.query.date_type,sequelize.col('date_added'))],
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}