const express = require('express');
const dotenv = require('dotenv');

// Load env vars from config file
dotenv.config({ path: './config/config.env' });

const app = express();

// That's how we access env variables with dotenv (after we have loaded them as per above)
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
