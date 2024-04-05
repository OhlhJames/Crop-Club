const Review = require('../models/Review'); // Assuming you have a Review model
const sequelize = require('../config/connection');

const reviewData = [
  { 
    rating: 5, 
    comment: 'Delicious apples!', 
    userId: 1, // Assuming you have the correct foreign key reference
    produceId: 1, // Assuming you have the correct foreign key reference
  },
  { 
    rating: 4, 
    comment: 'Great eggs, very fresh.', 
    userId: 2, // Assuming you have the correct foreign key reference
    produceId: 2, // Assuming you have the correct foreign key reference
  },
  // Add more review data as needed
];

const seedReviews = async () => {
  try {
    await sequelize.sync({ alter: true });
    await Review.bulkCreate(reviewData);
    console.log('Reviews seeded successfully');
  } catch (error) {
    console.error('Error seeding reviews:', error);
  }
};

module.exports = seedReviews;
