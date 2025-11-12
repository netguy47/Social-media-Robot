import express from 'express';
import authRouter from './auth.js';
import apiKeyRouter from './apiKey.js';
import postsRouter from './posts.js';
import billingRouter from './billing.js';
import socialRouter from './social.js';
import auth from '../../middleware/auth.js';
import rateLimiter from '../../middleware/rateLimiter.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/billing', billingRouter);
router.use('/keys', auth, rateLimiter, apiKeyRouter);
router.use('/posts', auth, rateLimiter, postsRouter);
router.use('/social', auth, rateLimiter, socialRouter);


export default router;
