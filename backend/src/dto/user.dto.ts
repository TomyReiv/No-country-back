import { ObjectId } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";

export default class UserDTO {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    country: string;
    comments: Array<ObjectId>;
    trips: Array<ObjectId>;
    role?: string;
    last_connection: Date;

    constructor(user: UserInterface) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.country = user.country;
        this.comments = user.comments;
        this.trips = user.trips;
        this.role = user.role;
        this.last_connection = user.last_connection;
    }
}

