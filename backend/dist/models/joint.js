import { Schema, model } from 'mongoose';
const JointSchema = new Schema({
    id: String,
    source: { type: String, required: true },
    destination: { type: String, required: true },
    type: { type: String, required: false }
});
export const Joint = model('joints', JointSchema);
