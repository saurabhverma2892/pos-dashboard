'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Orders', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

      cloud_site_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      source_id: DataTypes.INTEGER,
      order_status: DataTypes.INTEGER,
      order_amount: DataTypes.INTEGER,
      payment_mode: DataTypes.INTEGER,
      order_completion_status: DataTypes.INTEGER,
      date_added: DataTypes.DATE,
    },
    {
      tableName: 'cloud_site_user_processed_orders',
      timestamps: false
    }
  );
}