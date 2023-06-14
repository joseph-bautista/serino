const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const routes = require('./routes/routes');
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/find_treasures', routes);
app.use('/auth', authRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
