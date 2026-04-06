const mongoose = require('mongoose');

let connectionPromise = null;

async function connectDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (connectionPromise) return connectionPromise;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }

  connectionPromise = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10
  });

  return connectionPromise;
}

module.exports = { connectDb };
