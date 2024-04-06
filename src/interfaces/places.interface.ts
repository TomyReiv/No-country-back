import { ObjectId } from "mongoose";

export interface placesInterface {
    id: string,
    name: string,
    location: string,
    country: string,
    commentsId: Array<ObjectId>,
}