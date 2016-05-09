'use strict';

import passport from 'passport';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import {User} from'../sqldb';

var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well so i can send in the token in my query with access_token=??
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    /*.use(function(req, res, next) {
      User.find({
        where: {
          id: req.user.id
        }
      })
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(err => next(err));
    });*/
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  return jwt.sign({ id: id, role: role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
