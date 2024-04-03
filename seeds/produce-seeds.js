const db = require('./models'); // Imports database models

// Function to seed the database with sample produce data
const seedProduce = async () => {
  try {
    // Sample produce data
    const produceData = [
      { name: 'Organic Apples', price: 2.99, description: 'Fresh organic apples from local farms', farmerId: 1 },
      { name: 'Free-Range Eggs', price: 4.99, description: 'Locally sourced free-range eggs', farmerId: 2 },
      // Add  sample produce data as needed
    ];

    // Create sample produce items
    const produce = await db.Produce.bulkCreate(produceData);

    console.log('Produce seeded successfully!');
  } catch (error) {
    console.error('Error seeding produce:', error);
  } finally {
    // Close the database connection
    db.sequelize.close();
  }
};

// Call the seedProduce function to populate the database with produce data
module.exports = seedProduce();
