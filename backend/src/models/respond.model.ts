import mongoose, { Schema, Document } from 'mongoose';
import { respondsInterface } from '../interfaces/responds.interface';


const RespondSchema = new Schema<respondsInterface & Document>({
    id: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    date: {type: Date, required: true}
});


const RespondModel = mongoose.model<respondsInterface & Document>('Respond', RespondSchema);

export default RespondModel;