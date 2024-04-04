const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds'); // Import user seeds first
const seedFarmers = require('./farmer-seeds');
const seedProduce = require('./produce-seeds');
const seedReviews = require('./review-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers(); // Seed users first

  await seedFarmers();
  
  await seedProduce();
  
  await seedReviews();

  process.exit(0);
};

seedAll();
