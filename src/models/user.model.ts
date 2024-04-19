import mongoose, { Schema } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

const UserSchema = new Schema<UserInterface>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Place'}],
  role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
  avatar: {type:String},
  last_connection: { type: Date, default: Date.now() },
  status: {type: String, enum:['ACTIVE', 'INACTIVE'], default: 'INACTIVE'}
});

export default mongoose.model('User', UserSchema);
