const sequelize = require('../config/connection');
const seedProduce = require('./produce-seeds');
const seedReviews = require('./review-seeds');
const seedUsers = require('./user-seeds');
const seedFarmers= require('./farmer-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedProduce();

  await seedReviews();

  await seedUsers();

  await seedFarmers();

  process.exit(0);
};

seedAll();