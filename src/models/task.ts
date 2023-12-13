import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

export default model('Task', taskSchema)