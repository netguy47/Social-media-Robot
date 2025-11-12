import mongoose from 'mongoose';

const apiKeySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [String],
    enum: ['read', 'write', 'delete'],
    default: ['read'],
  },
}, {
  timestamps: true,
});

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

export default ApiKey;
