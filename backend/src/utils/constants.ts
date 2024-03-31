import dotenv from "dotenv";

dotenv.config();

export const port: string | undefined = process.env.PORT
export const db: string = process.env.DB || ''
export const secretKey: string = process.env.JWT_SECRET || ''