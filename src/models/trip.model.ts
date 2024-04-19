import mongoose, { Schema, Document } from 'mongoose';
import { tripsInterface } from '../interfaces/trips.interface';


const TripSchema: any = new Schema<tripsInterface>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:  { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  description: { type: String, required: true },
  stars:  { type: Number, min: 1, max: 5, required: true },
  activity: { type: String, required: true },
  photo:  { type: String },
  date: { type: Date, default: Date.now() },
});


export default mongoose.model('Trip', TripSchema);