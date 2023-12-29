import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    photoUrl: {
      type: String,
    },
    provider: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
