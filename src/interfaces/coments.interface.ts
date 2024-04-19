import { ObjectId } from "mongoose";

export interface commentsInterface {
    _id?: ObjectId,
    userId: ObjectId,
    text: string,
    respondsId?: Array<ObjectId>,
    date: Date,
    tripId: ObjectId,
    image?: string
    stars?: number
}