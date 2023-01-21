const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //a logger npm package;

// Route files
const bootcamps = require('./routes/bootcamps');

// Load env vars from config file
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

// That's how we access env variables with dotenv (after we have loaded them as per above)
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
