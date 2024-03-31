import mongoose, { Schema, Document } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';


const UserSchema = new Schema<UserInterface & Document>({
  id: { type: String },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  country: { type: String, required: true },
  comments: [{
    "_id": false,
    cid: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  }],
  trips: [{
    "_id": false,
    tid: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  }],
  role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
  last_connection: {type: Date, default: Date.now()}
});


const UserModel = mongoose.model<UserInterface & Document>('User', UserSchema);

export default UserModel;
