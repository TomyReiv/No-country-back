import mongoose, { Schema, Document } from 'mongoose';
import { commentsInterface } from '../interfaces/coments.interface';


const CommentSchema = new Schema<commentsInterface & Document>({
    id: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    text: { type: String, required: true },
    respondsId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Respond' }],
    date: {type: Date, default: Date.now(), required: true},
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', require: true },
    image: {type:  String},
    stars:{type:  Number, required: true},
});


export default mongoose.model('Comment', CommentSchema);
