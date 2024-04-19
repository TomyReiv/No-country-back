import mongoose, { Schema } from 'mongoose'
import { cityInterface } from '../interfaces/city.interface'

const CitySchema = new Schema<cityInterface>({
    name:{ type: String, required: true, unique: true },
    location:{ type: String, required: true },
    country:{ type: String, required: true },
    image:{ type: String},
    places:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }]
})
export default mongoose.model('City', CitySchema);