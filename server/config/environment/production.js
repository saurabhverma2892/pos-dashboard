'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8080,

  sequelize: {
    uri:  process.env.SEQUELIZE_URI ||
          'sqlite://',
    options: {
      logging: false,
      storage: 'dist.sqlite',
      define: {
        timestamps: false
      }
    }
  },

  mysql: {
    connectionLimit : 100, //important
     host     : 'localhost',
     username     : 'root',
     password : '',
     database : 'pos_dashboard',
     debug    :  true,
     options : {
      host: 'localhost',
      dialect: 'mysql'
     }
  }

  
};
