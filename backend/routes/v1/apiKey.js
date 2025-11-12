import express from 'express';
import crypto from 'crypto';
import auth from '../../middleware/auth.js';
import ApiKey from '../../models/ApiKey.js';

const router = express.Router();

// @route   POST api/v1/keys
// @desc    Generate a new API key
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const apiKey = crypto.randomBytes(32).toString('hex');

    const newApiKey = new ApiKey({
      user: req.user.id,
      key: apiKey,
    });

    await newApiKey.save();

    res.json({ apiKey });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
