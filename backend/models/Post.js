import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ['twitter', 'facebook', 'instagram', 'linkedin'],
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'posted'],
    default: 'draft',
  },
  scheduledAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

export default Post;
