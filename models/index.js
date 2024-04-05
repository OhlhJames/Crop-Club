const User = require('./user');
const Farmer = require('./farmer');
const Reviews = require('./Review');
const Produce = require('./produce');

User.hasOne(Farmer, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
  Farmer.belongsTo(User, {
    foreignKey: 'userId',
  });
  // Defining that a Farmer can have many Produces
  Farmer.hasMany(Produce, {
    foreignKey: 'farmerId',
    onDelete: 'CASCADE',
  });
  // Each Produce is associated with a Farmer
  Produce.belongsTo(Farmer, {
    foreignKey: 'farmerId',
  });
  // A User can have many Reviews
  User.hasMany(Reviews, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
  // Each Review is written by a User
  Reviews.belongsTo(User, {
    foreignKey: 'userId',
  });
module.exports = {User, Farmer, Reviews, Produce}