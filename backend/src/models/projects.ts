// import * as mongoose from 'mongoose';

import mongoose, { model, Schema } from 'mongoose';
import paginator from 'mongoose-paginate-v2';

// 1. Create an interface representing a document in MongoDB.
export interface IProject {
  // _id: mongoose.Schema.Types.ObjectId
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

ProjectSchema.plugin(paginator)

interface ProjectDocument extends mongoose.Document, IProject {}

// ProjectSchema.virtual('id').get(function() {
//   return this.toJSON()._id
// })

export default model<
  ProjectDocument,
  mongoose.PaginateModel<ProjectDocument>
>('Project', ProjectSchema, 'projects')
// 3. Create a Model.
// export default model<IProject>('Project', ProjectSchema);
