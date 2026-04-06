const { Router } = require('express');
const publicRoutes = require('./public');
const qrRoutes = require('./qr');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

router.use('/public', publicRoutes);
router.use('/qr', qrRoutes);

module.exports = router;
