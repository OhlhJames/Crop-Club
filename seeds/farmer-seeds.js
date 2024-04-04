const Farmer = require('../models/farmer');
const sequelize = require('../config/connection');

const farmerData = [
  {
    farm_name: 'Happy Farm',
    description: 'Organic produce straight from the farm to your table.',
    location: '123 Farm Road, Anytown, USA',
    user_id: 1, 
  },
  {
    farm_name: 'Sunshine Acres',
    description: 'Family-owned farm specializing in fresh fruits and vegetables.',
    location: '456 Sunshine Lane, Countryside, USA',
    user_id: 2, 
  },
];

const seedFarmers = async () => {
  try {
    await sequelize.sync({ alter: true });
    await Farmer.bulkCreate(farmerData);
    console.log('Farmers seeded successfully');
  } catch (error) {
    console.error('Error seeding farmers:', error);
  }
};

module.exports = seedFarmers;
