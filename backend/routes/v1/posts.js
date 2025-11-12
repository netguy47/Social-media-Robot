import express from 'express';
import { TwitterApi } from 'twitter-api-v2';
import auth from '../../middleware/auth.js';
import Post from '../../models/Post.js';
import User from '../../models/User.js';

const router = express.Router();

// @route   POST api/v1/posts/create
// @desc    Create a new post
// @access  Private
router.post('/create', auth, async (req, res) => {
  const { content, platform, status, scheduledAt } = req.body;

  try {
    const newPost = new Post({
      user: req.user.id,
      content,
      platform,
      status,
      scheduledAt,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/v1/posts
// @desc    Get all posts for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/v1/posts/:id
// @desc    Get a single post
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/v1/posts/:id
// @desc    Update a post
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { content, platform, status, scheduledAt } = req.body;

  // Build post object
  const postFields = {};
  if (content) postFields.content = content;
  if (platform) postFields.platform = platform;
  if (status) postFields.status = status;
  if (scheduledAt) postFields.scheduledAt = scheduledAt;

  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: postFields },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/v1/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/v1/posts/publish/:id
// @desc    Publish a post to Twitter
// @access  Private
router.post('/publish/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const user = await User.findById(req.user.id);

    if (!user.twitter_access_token) {
      return res.status(400).json({ msg: 'Twitter account not connected' });
    }

    const client = new TwitterApi(user.twitter_access_token);
    const { data: createdTweet } = await client.v2.tweet(post.content);

    post.status = 'posted';
    await post.save();

    res.json(createdTweet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
