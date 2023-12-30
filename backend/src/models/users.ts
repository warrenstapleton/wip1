// import * as mongoose from 'mongoose';

import { model, Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  email: string;
  name: string;
  photoUrl?: string;
  provider: string;
};

// 2. Create a Schema corresponding to the document interface.
const UserSchema = new Schema<IUser>({
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    photoUrl: String,
    provider: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  });

// 3. Create a Model.
export default model<IUser>('User', UserSchema);
