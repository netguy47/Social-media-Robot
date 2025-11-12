import express from 'express';
import { TwitterApi } from 'twitter-api-v2';
import auth from '../../middleware/auth.js';
import User from '../../models/User.js';

const router = express.Router();

// @route   POST api/v1/social/twitter/post
// @desc    Post to Twitter
// @access  Private
router.post('/twitter/post', auth, async (req, res) => {
  const { content } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user.twitter_access_token) {
      return res.status(400).json({ msg: 'Twitter account not connected' });
    }

    const client = new TwitterApi(user.twitter_access_token);
    const { data: createdTweet } = await client.v2.tweet(content);

    res.json(createdTweet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
