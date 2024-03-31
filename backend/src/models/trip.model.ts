import mongoose, { Schema, Document } from 'mongoose';
import { tripsInterface } from '../interfaces/trips.interface';


const TripSchema = new Schema<tripsInterface & Document>({
  id: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  commentsId: [{
    "_id": false,
    cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Comments' },
  }],
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
});


const TripModel = mongoose.model<tripsInterface & Document>('Trip', TripSchema);

export default TripModel;