const { Router } = require('express');
const { nanoid } = require('nanoid');
const PageView = require('../models/PageView');

const router = Router();

const features = [
  {
    id: 'dynamic-routing',
    title: 'Smart Dynamic Routing',
    description: 'Route users by device, location, or time window with automatic fallback links.'
  },
  {
    id: 'bulk',
    title: 'Bulk QR Manager',
    description: 'Upload CSVs to generate hundreds of QR codes in minutes with team tagging.'
  },
  {
    id: 'brand-kit',
    title: 'Brand Kit & Templates',
    description: 'Save logos, color palettes, and templates to keep every QR on-brand.'
  },
  {
    id: 'security',
    title: 'Security Controls',
    description: 'Password protect, set scan limits, and schedule expirations for sensitive links.'
  },
  {
    id: 'analytics',
    title: 'Scan Analytics',
    description: 'Track scans by location, device, time, and campaign with export-ready reports.'
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect to Google Sheets, Zapier, Slack, and webhooks for automation.'
  }
];

const pricing = [
  {
    id: 'free',
    name: 'Free',
    priceMonthly: 0,
    highlights: ['Unlimited static QR', '3 dynamic QR', 'Basic scan stats']
  },
  {
    id: 'regular',
    name: 'Regular',
    priceMonthly: 7,
    highlights: ['12 dynamic QR', 'Unlimited scans', 'Exportable analytics']
  },
  {
    id: 'advanced',
    name: 'Advanced',
    priceMonthly: 16,
    highlights: ['200 dynamic QR', 'Bulk generation', 'Custom domains']
  },
  {
    id: 'premium',
    name: 'Premium',
    priceMonthly: 37,
    highlights: ['600 dynamic QR', 'White label', 'Priority support']
  }
];

const faqs = [
  {
    q: 'What is the difference between static and dynamic QR codes?',
    a: 'Static QR codes are fixed and free. Dynamic QR codes let you edit the destination, add tracking, and update after printing.'
  },
  {
    q: 'Can I customize the QR design and add my logo?',
    a: 'Yes. You can adjust colors, patterns, frames, and upload your logo with automatic contrast checks.'
  },
  {
    q: 'Do QR codes ever expire?',
    a: 'Static QR codes do not expire. Dynamic codes can have expirations or schedules if you enable them.'
  },
  {
    q: 'Is bulk generation supported?',
    a: 'Yes, upload a CSV to create hundreds of QR codes with tags and campaign names.'
  },
  {
    q: 'Can I track scans by location or device?',
    a: 'Yes. We provide analytics by country, city, device type, and time period.'
  },
  {
    q: 'Do you support custom domains?',
    a: 'Yes, Pro plans can host dynamic links on your custom domain for higher trust.'
  },
  {
    q: 'Can I integrate with other tools?',
    a: 'We support Zapier, webhooks, and native integrations with sheets and CRMs.'
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. You can start for free and upgrade only when you need advanced features.'
  }
];

router.get('/features', (req, res) => {
  res.json({ features });
});

router.get('/pricing', (req, res) => {
  res.json({ pricing });
});

router.get('/faqs', (req, res) => {
  res.json({ faqs });
});

router.post('/analytics/pageview', async (req, res, next) => {
  try {
    const payload = {
      id: nanoid(10),
      path: req.body?.path || '/',
      referrer: req.body?.referrer || '',
      userAgent: req.headers['user-agent'] || '',
      createdAt: new Date()
    };

    await PageView.create(payload);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
