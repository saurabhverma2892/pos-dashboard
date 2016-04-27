'use strict';

import crypto from 'crypto';

var validatePresenceOf = function(value) {
  return value && value.length;
};

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
      user_id: DataTypes.INTEGER,
      username: DataTypes.STRING,
      merchcode: DataTypes.STRING,
      cloud_site_id: DataTypes.INTEGER,

  }, {

    tableName: 'pos_merch_code',
    timestamps: false,

    instanceMethods: {
      /**
       * Authenticate - check if the passwords are the same
       *
       * @param {String} password
       * @param {Function} callback
       * @return {Boolean}
       * @api public
       */
      authenticate: function(merchcode, callback) {
        if (!callback) {
          return this.merchcode === this(merchcode);
        }
        callback(null, true);
      },

    },

    /**
     * Virtual Getters
     */
    getterMethods: {
      // Public profile information
      profile: function() {
        return {
          'username': this.username,
          'cloud_site_id': this.cloud_site_id
        };
      },

      // Non-sensitive info we'll be putting in the token
      token: function() {
        return {
          'username': this.username,
          'cloud_site_id': this.cloud_site_id
        }
      }
    }  
  });

  return User;
};
