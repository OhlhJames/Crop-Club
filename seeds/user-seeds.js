const { User } = require('../models'); // Import the User model

const userData = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password456',
  },
  
];

const seedUsers = () => User.bulkCreate(userData); // Seed the User table with the userData array

module.exports = seedUsers; // Export the seedUsers function
