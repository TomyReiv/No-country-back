import mongoose, { Schema, Document, Types } from 'mongoose'
import { placesInterface } from '../interfaces/places.interface'
import userModel from './user.model';

const starsSchema = new  Schema({
	rating: Number,
	uid: {type: mongoose.Schema.Types.ObjectId, ref: userModel}
}, {'_id': false});

const PlaceSchema = new Schema<placesInterface>({
	name: { type: String, required: true, unique: true },
	city:{type: mongoose.Schema.Types.ObjectId, ref: 'city', required: true},
	image: { type: String },
	trip: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
	stars: [starsSchema]
})

export default mongoose.model('Place', PlaceSchema);
