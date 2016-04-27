'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Location', {
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
      location_name: DataTypes.STRING,
      cloud_site_id: DataTypes.INTEGER,
    },
    {
      tableName: 'cloud_site_locations',
      timestamps: false,
    }
  );
}
