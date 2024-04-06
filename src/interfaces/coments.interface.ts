import { ObjectId } from "mongoose";

export interface commentsInterface {
    id: string,
    userId: ObjectId,
    text: string,
    respondsId: Array<ObjectId>,
    date: Date,
    placeId: ObjectId
}