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

export const backURL:string = process.env.bakcURL || 'http://localhost:8080';
export const frontURL:string = process.env.frontURL || 'http://localhost:3000';

export const CLOUDINARY_NAME: string = process.env.CLOUDINARY_NAME || '';
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || '';
export const CLOUDINARY_API_SECRET: string = process.env.CLOUDINARY_API_SECRET || '';

export enum CODE {
	BAD_REQUEST = 400,
	NOT_FOUND = 404,
	CREATED = 201,
	OK = 200,
	INTERNAL_SERVER_ERROR = 500,
	UNAUTHORIZED_ACCESS = 401,
	FORBIDDEN = 403
}

export enum ROLE {
	USER = 'USER',
	ADMIN = 'ADMIN'
}
