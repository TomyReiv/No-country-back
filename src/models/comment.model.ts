import mongoose, { Schema, Document } from 'mongoose';
import { commentsInterface } from '../interfaces/coments.interface';


const CommentSchema = new Schema<commentsInterface & Document>({
    id: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    text: { type: String, required: true },
    respondsId: [{
        "_id": false,
        rid: { type: mongoose.Schema.Types.ObjectId, ref: 'Respond' }
    }],
    date: {type: Date, default: Date.now(), required: true},
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', require: true },
    image: {type:  String}
});


export default mongoose.model('Comment', CommentSchema);
