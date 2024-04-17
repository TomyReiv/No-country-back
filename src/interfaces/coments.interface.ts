import { ObjectId } from "mongoose";

export interface commentsInterface {
    _id?: ObjectId,
    userId: ObjectId,
    text: string,
    respondsId?: Array<ObjectId>,
    date: Date,
    placeId: ObjectId,
    image?: string
}