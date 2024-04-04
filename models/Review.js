const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false, // Assuming userId cannot be null
            references: {
                model: 'user',
                key: 'id',
            },
        },
        produceId: {
            type: DataTypes.INTEGER,
            allowNull: false, // Assuming produceId cannot be null
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
        modelName: 'review',
    }
);

module.exports = Review;
