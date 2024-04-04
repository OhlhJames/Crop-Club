const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Reviews extends Model{};

Reviews.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        comment:{
            type: DataTypes.STRING,
            allowNull: false
        },
        rating:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId:{
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        produceId:{
            type: DataTypes.INTEGER,
            references: {
                model: 'produce',
                key: 'id',
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

module.exports = Reviews;