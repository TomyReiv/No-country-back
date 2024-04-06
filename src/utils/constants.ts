import dotenv from "dotenv";

dotenv.config();

export const port: string | undefined = process.env.PORT;
export const db: string = process.env.DB || '';
export const secretKey: string = process.env.JWT_SECRET || '';
export const secret: string = process.env.SECRET || '';
export const secretGoogle: string = process.env.secretGoogle || '';
// Email
export const GMAIL_USER:string =  process.env.GMAIL_USER!;
export const GMAIL_PASS:string =  process.env.GMAIL_PASS!;

export const backURL:string = 'http://localhost:8080';
export const frontURL:string = 'http://localhost:8080';