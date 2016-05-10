/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  /*sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)*/
  sequelize: new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, config.mysql.options)
};

// Insert models below
/*db.OrderSources = db.sequelize.import('../api/order_sources/orders_sources.model'); db.OrderSources.sync();
*/
db.User = db.sequelize.import('../api/user/user.model');
db.User.sync();


module.exports = db;
