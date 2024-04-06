import mongoose, { Schema, Document } from 'mongoose';
import { placesInterface } from '../interfaces/places.interface';


const PlaceSchema = new Schema<placesInterface & Document>({
  id: { type: String },
  name: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  commentsId: [{
    "_id": false,
    cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  }]
});


export default mongoose.model('Place', PlaceSchema);
