import * as mongoose from 'mongoose';
import './comments';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    body: { type: String, required: true },
    keywords: String,
    url: {
      type: String,
      required: true,
      index: { unique: true },
    },
    adsRequired: Boolean,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Blog', BlogSchema);
