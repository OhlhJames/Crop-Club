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

  socket.on('chat message', (msg) => {
    // Echo the received message back to the client
    //io.emit('chat message', `User: ${msg}`);

    // Automated responses based on the message
    if (msg.toLowerCase().includes('hello')) {
      io.emit('chat message', 'Server: Hello!');
    } else if (msg.toLowerCase().includes('availability')) {
      // Call the function to check the product availability
      const availability = getProductAvailability();
      io.emit('chat message', `Server: The product is available, we have ${availability} in stock.`);
    } else if (msg.toLowerCase().includes('thank you')) {
      io.emit('chat message', 'Server: It has been a pleasure to help you!');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

function getProductAvailability() {
  // This is an example function that should interact with your database or data source
  // to get real product availability. For now, it returns a static value.
  return 10; // Example static value
}

// Database synchronization
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
});
