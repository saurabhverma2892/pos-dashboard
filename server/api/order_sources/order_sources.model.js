'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('OrderSources', {
      source_name: DataTypes.STRING,
      source_id: DataTypes.INTEGER,
    },
    {
      tableName: 'cloud_site_sources',
      timestamps: false,
    }
  );
}
