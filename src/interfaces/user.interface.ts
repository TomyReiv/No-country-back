import { ObjectId } from "mongoose";
import { AuthInterface } from "./auth.interface";

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

export interface UserInterface extends AuthInterface {
    _id?: string;
    first_name: string;
    last_name: string;
    country: string;
    comments?: Array<any>;
    trips?: Array<any>;
    favorites?: Array<any>;
    role?: UserRole;
    avatar?: String;
    last_connection: Date;
    status?: string;
    leter?: string;
}