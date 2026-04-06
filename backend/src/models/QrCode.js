const mongoose = require('mongoose');

const QrCodeSchema = new mongoose.Schema({
  id: { type: String, index: true, unique: true },
  type: { type: String, required: true },
  payload: { type: Object, default: {} },
  style: { type: Object, default: {} },
  plan: { type: String, default: 'free' },
  isDynamic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.QrCode || mongoose.model('QrCode', QrCodeSchema);
