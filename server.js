const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //a logger npm package;
const colors = require('colors');
const connectDB = require('./config/db');

// Load env vars from config file
dotenv.config({ path: './config/config.env' });

// Connect to db
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body parser e.g allows us to use req.body in the controllers to send body data from post man and see it for example displayed in console
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

// That's how we access env variables with dotenv (after we have loaded them as per above)
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
