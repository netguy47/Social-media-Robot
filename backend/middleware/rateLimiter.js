import rateLimit from 'express-rate-limit';
import User from '../models/User.js';

const getTier = async (req) => {
  const user = await User.findById(req.user.id);
  return user ? user.subscription_tier : 'free';
};

const rateLimiter = async (req, res, next) => {
  const tier = await getTier(req);

  let limit;
  switch (tier) {
    case 'pro':
      limit = 500;
      break;
    case 'business':
      limit = Infinity; // Or a very high number
      break;
    default: // free tier
      limit = 10;
  }

  if (limit === Infinity) {
    return next();
  }

  return rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: limit,
    handler: (req, res, next) => {
      res.status(402).json({
        msg: 'You have exceeded your API call limit. Please upgrade your plan.',
      });
    },
  })(req, res, next);
};

export default rateLimiter;
