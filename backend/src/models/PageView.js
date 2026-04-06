const mongoose = require('mongoose');

const PageViewSchema = new mongoose.Schema({
  id: { type: String, index: true, unique: true },
  path: { type: String, required: true },
  referrer: { type: String, default: '' },
  userAgent: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.PageView || mongoose.model('PageView', PageViewSchema);
