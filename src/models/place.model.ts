import mongoose, { Schema, Document, Types } from 'mongoose'
import { placesInterface } from '../interfaces/places.interface'

const PlaceSchema = new Schema<placesInterface & Document>({
	id: { type: String },
	name: { type: String, required: true },
	location: { type: String, required: true },
	country: { type: String, required: true },
	image: { type: String },
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
})

export default mongoose.model('Place', PlaceSchema);
