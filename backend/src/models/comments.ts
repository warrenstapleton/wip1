import {model, Schema, Types} from 'mongoose';
import './users.js';

export interface IComment {
  comment: string;
  user:  Types.ObjectId;
}

const CommentSchema = new Schema<IComment>(
  {
    comment: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  {
    timestamps: true,
  }
);

export default model<IComment>('Comment', CommentSchema);
