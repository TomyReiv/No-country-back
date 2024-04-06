import Jwt from 'jsonwebtoken';
import { secretKey } from "../utils/constants";
import userModel from "../models/user.model";
import { Request, Response, NextFunction } from 'express';


export const adminPolicy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 
        
        if (!token) {
            return res.status(401).json({ error: 'No autorizado' }); 
        }

        const decodedToken = Jwt.verify(token, secretKey) as { id: string };

        const user = await userModel.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Solo el administrador puede borrar un usuario' })
        }

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Authentication failed' });
    }
}