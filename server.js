const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
// const cookieParser = require('cookie-parser');
const sequelize = require('./config/connection');
const routes = require('./controllers');

// Import the HTTP module to create an HTTP server
const http = require('http');

const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Import Socket.IO and pass the HTTP server to it
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session middleware for authentication
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use(routes);

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', async (msg) => {
    // Handle a simple greeting
    if (msg.toLowerCase().includes('hello')) {
      io.emit('chat message', 'Server: Hello!');
    }
    // Improved check for product availability questions
    else if (msg.toLowerCase().includes('available')) {
      // Use a regular expression to find a pattern like "[product] available"
      const match = msg.match(/(.*)\savailable/i);
  
      // If there's a match and a product name could be extracted
      if (match && match[1]) {
        const productName = match[1].trim();
  
        // Call the function to check product availability and reviews
        const availabilityAndReviews = await getProductAvailability(productName);
        io.emit('chat message', `Server: ${availabilityAndReviews}`);
      } else {
        io.emit('chat message', 'Server: Please specify a product name.');
      }
    }
    // Respond to a thank you message
    else if (msg.toLowerCase().includes('thank you')) {
      io.emit('chat message', 'Server: You\'re welcome! It has been a pleasure to help you.');
    }    
  });
  
  
  
});

async function getProductAvailability(productName) {
  try {
    const product = await sequelize.models.produce.findOne({
      where: { name: productName },
    });

    if (product) {
      // Check if the product is available
      if (product.availability) {
        const reviews = await sequelize.models.review.findAll({
          where: { produceId: product.id },
          attributes: ['comment', 'rating'],
        });

        let reviewsMessage = reviews.length > 0 ? 'Reviews:\n' : 'No reviews yet.\n';
        reviews.forEach(review => {
          reviewsMessage += `Rating: ${review.rating}, Comment: "${review.comment}"\n`;
        });

        return `The product ${productName} is available. ${reviewsMessage}`;
      } else {
        // Return a message for unavailable products
        return `We are sorry, ${productName} is currently not available. We will contact you when the product is available again.`;
      }
    } else {
      return `Product ${productName} not found.`;
    }
  } catch (error) {
    console.error('Error fetching product availability and reviews:', error);
    return 'An error occurred while fetching product details.';
  }
}




// Database synchronization
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});
