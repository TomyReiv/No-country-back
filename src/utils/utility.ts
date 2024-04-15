import bcrypt from "bcrypt"; 
import { UserInterface } from "../interfaces/user.interface";
import Jwt from 'jsonwebtoken';
import { secretKey } from "./constants";
import userModel from "../models/user.model";
import { Request, Response, NextFunction } from 'express';
import UserDTO from "../dto/user.dto";
import userRepository from "../repositories/user.repository";

export const createHash = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password: string, user: UserInterface) => bcrypt.compareSync(password, user.password);

export const tokenGenerator = (user: UserDTO) =>{
    const { id, first_name, last_name, email, role } = user;
    const payload = {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        role: role
    };
    const token = Jwt.sign(payload, secretKey, {expiresIn: '24h'});
    return token;
};

/* interface AuthenticatedRequest extends Request {
    user?: any;
} */

export const jwtAuthBear = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' }); 
        }

        const decodedToken = Jwt.verify(token, secretKey) as { id: string };

        const user = await userRepository.getUserById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

       req.user = decodedToken; 
       
        next();
    } catch (error) {
        console.error('Error in jwtAuthBear middleware:', error);
        return res.status(401).json({ error: 'Authentication failed' });
    }
};