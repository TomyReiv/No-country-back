import { ObjectId } from "mongoose";
import { commentsInterface } from "../interfaces/coments.interface";

export default class CommentDto {
    id: ObjectId;
    userId: ObjectId;
    text: string;
    respondsId: Array<ObjectId>;
    date: Date;
    tripId: ObjectId;

    constructor(comments: commentsInterface){
        this.id = comments._id!;
        this.userId = comments.userId;
        this.text = comments.text;
        this.respondsId = comments.respondsId || [];
        this.date = comments.date;
        this.tripId = comments.tripId;
    }
}