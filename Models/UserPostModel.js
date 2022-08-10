import mongoose from 'mongoose';

const UserPostSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isActivated: {
    type: Boolean,
  },
  avatarUrl: String,
});

export default mongoose.model('UserPost', UserPostSchema);
