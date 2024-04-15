import mongoose, { Schema, Document } from 'mongoose';
import { respondsInterface } from '../interfaces/responds.interface';


const RespondSchema = new Schema<respondsInterface & Document>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    text: { type: String, required: true },
    date: {type: Date, required: true}
});


export default mongoose.model('Respond', RespondSchema);
