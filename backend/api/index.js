require('dotenv').config();
const app = require('../src/app');
const { connectDb } = require('../src/db');

module.exports = async (req, res) => {
  try {
    await connectDb();
    return app(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' });
  }
};
