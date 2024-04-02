const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Farmer extends Model {}

Farmer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        farm_name: {
             type: DataTypes.STRING,
             allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key:'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'farmer',
      }
)

module.exports = Farmer;