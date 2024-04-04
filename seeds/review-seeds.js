const {Review} = require('../models'); // Imports database models


// Sample review data
const reviewData = [
  { 
    rating: 5, 
    comment: 'Delicious apples!', 
    userId: 1, 
    produceId: 1 
  },
  { 
    rating: 4, 
    comment: 'Great eggs, very fresh.', 
    userId: 2, 
    produceId: 2 
  },
  // Add sample review data as needed
];

    // Create sample reviews
const seedReviews = () => Review.bulkCreate(reviewData);
// Call the seedReviews function to populate the database with review data
module.exports = seedReviews;
