import mongoose, { Schema, Document } from 'mongoose';
import { tripsInterface } from '../interfaces/trips.interface';

const commentSchema = new Schema({
  tid: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }
}, { _id: false });

const TripSchema = new Schema<tripsInterface>({
  id: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  commentsId: [commentSchema],
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
});


export default mongoose.model('Trip', TripSchema);