const {Produce} = require('./models'); // Imports database models


const produceData = [
  { 
    name: 'Organic Apples', 
    price: 2.99, 
    description: 'Fresh organic apples from local farms', 
    farmerId: 1 
  },
  { 
    name: 'Free-Range Eggs', 
    price: 4.99, 
    description: 'Locally sourced free-range eggs', 
    farmerId: 2 
  },
  // Add  sample produce data as needed
];
const seedProduce = () => Produce.bulkCreate(produceData); // Seed the Produce table with the produceData array
// Call the seedProduce function to populate the database with produce data
module.exports = seedProduce;
