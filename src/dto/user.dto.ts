import { ObjectId } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";

export default class UserDTO {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    country: string;
    comments?: Array<any>;
    trips: Array<any>;
    role?: string;
    last_connection: Date;
    avatar?:String;
    status?: string;
    leter?: string;
    favorites?: Array<any>;

    constructor(user: UserInterface) {
        this.id = user._id!;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.country = user.country;
        this.comments = user.comments || [];
        this.trips = user.trips || [];
        this.role = user.role;
        this.avatar = user.avatar;
        this.last_connection = user.last_connection;
        this.status = user.status;
        this.favorites = user.favorites;
        this.leter = user.first_name.trim().split("")[0].toUpperCase();
    }
}

