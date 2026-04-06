const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

const allowedOrigins = (process.env.FRONTEND_ORIGIN || '')
  .split(',')
  .map((v) => v.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.length === 0) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  }
}));

app.use(express.json({ limit: '2mb' }));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.json({
    name: 'smartQR API',
    status: 'ok',
    time: new Date().toISOString()
  });
});

app.use('/api', routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Server error',
    status
  });
});

module.exports = app;
