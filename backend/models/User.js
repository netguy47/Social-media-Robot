import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscription_tier: {
    type: String,
    enum: ['free', 'pro', 'business'],
    default: 'free',
  },
  stripe_customer_id: {
    type: String,
  },
  twitter_access_token: {
    type: String,
  },
  socialProfiles: {
    twitter: String,
    facebook: String,
    instagram: String,
    linkedin: String,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
