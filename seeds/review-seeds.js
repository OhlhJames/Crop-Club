const db = require('./models'); // Imports database models

// Function to seed the database with sample review data
const seedReviews = async () => {
  try {
    // Sample review data
    const reviewData = [
      { rating: 5, comment: 'Delicious apples!', userId: 1, produceId: 1 },
      { rating: 4, comment: 'Great eggs, very fresh.', userId: 2, produceId: 2 },
      // Add sample review data as needed
    ];

    // Create sample reviews
    const reviews = await db.Review.bulkCreate(reviewData);

    console.log('Reviews seeded successfully!');
  } catch (error) {
    console.error('Error seeding reviews:', error);
  } finally {
    // Close the database connection
    db.sequelize.close();
  }
};

// Call the seedReviews function to populate the database with review data
module.exports = seedReviews();
