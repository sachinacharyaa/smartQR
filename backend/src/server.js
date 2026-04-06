require('dotenv').config();
const app = require('./app');
const { connectDb } = require('./db');

const port = process.env.PORT || 4000;

(async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`smartQR API listening on ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
