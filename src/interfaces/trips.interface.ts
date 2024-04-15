import { ObjectId } from "mongoose";

export interface tripsInterface {
    id?: string,
    userId: ObjectId,
    name: string,
    comments?: Array<ObjectId>,
    date: Date,
    description: String,
    activity:string,
    placeId: ObjectId,
    photo?: Array<String>,
    stars: Number,
}