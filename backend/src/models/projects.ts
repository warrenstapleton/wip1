// import * as mongoose from 'mongoose';

import { model, Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IProject {
  name: string;
  owner: string;
  completed: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const ProjectSchema = new Schema<IProject>({
    name: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  });

// 3. Create a Model.
export default model<IProject>('Project ', ProjectSchema);
