import { model, Schema, Types } from 'mongoose';
import './comments.js';

export interface IBlog {
  title: string;
  description: string;
  body: string;
  keywords: string;
  url: string;
  adsRequired: boolean;
  comments: [type: Types.ObjectId];
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    description: String,
    body: { type: String, required: true },
    keywords: String,
    url: {
      type: String,
      required: true,
      index: { unique: true }
    },
    adsRequired: Boolean,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model<IBlog>('Blog', BlogSchema);
