import { ObjectId } from "mongoose";

export interface tripsInterface {
    id: string,
    userId: ObjectId,
    commentsId: Array<ObjectId>,
    date: Date,
    placeId: ObjectId
}