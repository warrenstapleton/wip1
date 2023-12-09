import {Schema, model} from 'mongoose';

interface IJoint {
    id?: string,
    source: string,
    destination: string,
    type?: string
}

const JointSchema = new Schema<IJoint>({
    id: String,
    source: {type: String, required: true},
    destination: {type: String, required: true},
    type: {type: String, required: false}
})

export const Joint = model<IJoint>('joints', JointSchema);




