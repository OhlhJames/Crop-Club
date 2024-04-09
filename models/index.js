const User = require('./user');
const Farmer = require('./farmer');
const Reviews = require('./Review');
const Produce = require('./produce');

// Farmer.belongsToMany(Produce, {
//     foreignKey: 'farmerId'
// });
 
// Produce.belongsTo(Farmer, {
//     foreignKey: 'farmerId'
// });

// Produce.belongsToMany(Reviews, {
//     foreignKey: 'produceId'
// });

// Reviews.belongsTo(Produce, {
//     foreignKey: 'produceId'
// });


module.exports = {User, Farmer, Reviews, Produce}