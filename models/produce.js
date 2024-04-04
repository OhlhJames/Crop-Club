const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Produce extends Model{}

Produce.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        description: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        price:{
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        availability:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        filename:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        farmerId:{
            type: DataTypes.STRING,
            references: {
                model: 'farmer',
                key: 'id',
            },
        },

    },
    {
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'produce', 
    }

)

module.exports = Produce