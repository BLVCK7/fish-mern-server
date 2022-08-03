import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    fishingDate: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      default: 20,
      required: true,
    },
    windDirection: {
      type: String,
      default: 'Северный',
      required: true,
    },
    windPower: {
      type: String,
      default: 'Штиль',
      required: true,
    },
    pressure: {
      type: Number,
      default: 745,
      required: true,
    },
    fish: {
      type: Array,
      default: [],
      required: true,
    },
    postMedia: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    // imageUrl: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Post', PostSchema);
