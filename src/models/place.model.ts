import mongoose, { Schema, Document, Types } from 'mongoose'
import { placesInterface } from '../interfaces/places.interface'
import CommentModel from './comment.model'

const commentSchema = new Schema(
	{
		cid: { type: Types.ObjectId, ref: CommentModel }
	},
	{ _id: false }
)

const PlaceSchema = new Schema<placesInterface & Document>({
	id: { type: String },
	name: { type: String, required: true },
	location: { type: String, required: true },
	country: { type: String, required: true },
	image: { type: String },
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
})

export default mongoose.model('Place', PlaceSchema)
