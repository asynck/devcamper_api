const mongoose = require('mongoose');

const connectDB = async () => {
  // mongoose.connect returns a promise - hence why we used async at our function to be able to asyncronously receive a response
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.bold);
};

module.exports = connectDB;
