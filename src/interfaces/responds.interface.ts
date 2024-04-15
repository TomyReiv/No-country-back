import { ObjectId } from "mongoose";

export interface respondsInterface {
    id?: string,
    userId: ObjectId,
    text: string,
    date: Date,
    commentId: ObjectId
}