const { Farmer } = require('../models/farmer'); // Import the Farmer model

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

const seedFarmers = () => Farmer.bulkCreate(farmerData); // Seed the Farmer table with the farmerData array

module.exports = seedFarmers; // Export the seedFarmers function
