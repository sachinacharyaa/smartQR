const { Router } = require('express');
const { z } = require('zod');
const { nanoid } = require('nanoid');
const QrCode = require('../models/QrCode');

const router = Router();

const createSchema = z.object({
  type: z.string().min(2).max(40),
  payload: z.record(z.any()).default({}),
  isDynamic: z.boolean().optional(),
  style: z.record(z.any()).default({}),
  plan: z.string().optional()
});

router.post('/', async (req, res, next) => {
  try {
    const data = createSchema.parse(req.body || {});
    const record = await QrCode.create({
      id: nanoid(12),
      type: data.type,
      payload: data.payload,
      style: data.style,
      plan: data.plan || 'free',
      isDynamic: Boolean(data.isDynamic),
      createdAt: new Date()
    });

    res.status(201).json({
      id: record.id,
      status: 'created'
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const record = await QrCode.findOne({ id: req.params.id }).lean();
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json({ record });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
