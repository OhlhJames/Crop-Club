const Produce = require('../models/produce'); // Assuming you have a Produce model
const sequelize = require('../config/connection');

const produceData = [
  {
    name: 'Apples',
    description: 'Fresh apples from Happy Farm.',
    price: 2.99,
    availability: true,
    filename: 'apples.jpg',
    farmerId: 1, // Updated to match the foreign key reference
  },
  {
    name: 'Eggs',
    description: 'Organic eggs from Sunshine Acres.',
    price: 3.99,
    availability: true,
    filename: 'eggs.jpg',
    farmerId: 2, // Updated to match the foreign key reference
  },
];

const seedProduce = async () => {
  try {
    await sequelize.sync({ alter: true });
    await Produce.bulkCreate(produceData);
    console.log('Produce seeded successfully');
  } catch (error) {
    console.error('Error seeding produce:', error);
  }
};

module.exports = seedProduce;
