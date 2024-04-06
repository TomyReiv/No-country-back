import express, { Request, Response, NextFunction } from 'express';
import userController from '../controllers/user.controller';
import emailService from '../services/email.service';
import { tokenGenerator } from '../utils/utility';
import { backURL, secretKey, frontURL } from '../utils/constants';
import Jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/pass-recover", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username } = req.body;

        const user = await userController.findOne(req.body)
        if (!user) res.status(401).send({ error: "Usuario no encontrado" });
        const token = tokenGenerator(user);
        const snedMail = await emailService.sendEmail(
            'aventuracompartida@email.com',
            email,
            'Cambio de contraseña',
            `<h1>Para cambiar contraseña toque el siguente enlace:</h1>
            <a  href="${backURL}/resetPassword/${token}">Cambio de Contraseña</a>`,
        )
        if(snedMail.accepted){
            res.status(200).json({msg:"Correo enviado"});
        } else{
            throw new Error('Error al enviar correo');
        }
        
    } catch (error) {
        next(error);
    }

})

router.get("/pass-recover/:token", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.params;

        const decodedToken = Jwt.verify(token, secretKey) as { id: string };
        Jwt.verify(token, secretKey, async (error, payload: any) => {
            if (error) res.status(403).json({ message: "No authorized" });
            const user = await userController.findOne(payload);
            res.redirect(`${frontURL}/${user.id}`);
        });
    } catch (error) {
        next(error);
    }

})

export default router;