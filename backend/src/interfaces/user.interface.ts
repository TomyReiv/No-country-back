import { ObjectId } from "mongoose";
import { AuthInterface } from "./auth.interface";

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

export interface UserInterface extends AuthInterface {
    id: string;
    first_name: string;
    last_name: string;
    country: string;
    comments: Array<ObjectId>;
    trips: Array<ObjectId>;
    role?: UserRole;
    last_connection: Date
}