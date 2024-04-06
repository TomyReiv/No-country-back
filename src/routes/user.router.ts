import express, { Request, Response, NextFunction } from 'express';
import UserController from '../controllers/user.controller';
import { userValidator, handleUserValidationErrors } from '../middlewares/user.validator';
import passport from "passport";
import userController from '../controllers/user.controller';
import { tokenGenerator } from '../utils/utility';
import { jwtAuthBear } from '../utils/utility';
import { adminPolicy } from '../middlewares/adminPolicy';

const router = express.Router();


router.get('/users', jwtAuthBear, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserController.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/users/:uid', jwtAuthBear, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { uid } = req.params;
        const users = await UserController.getUserById(uid);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});


router.post("/users/loginGoogle", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserController.loggGoogle(req.body);
        const token = tokenGenerator(user);
        return res.status(201).json({
            ok: true,
            token,
            msg: "Loggin exitoso"
        });
    } catch (error) {
        next(error);
    }
})

router.post(
    "/users",
    userValidator,
    handleUserValidationErrors,
    passport.authenticate("register", {
        failureMessage: "User already register",
    }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({ message: "Usuario creado" });
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/users/login',
    passport.authenticate("login"),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, ...rest } = req.body;

            const userToken = await userController.findOne(req.body);

            const token = tokenGenerator(userToken);

            res.status(200).json({
                ok: true,
                token,
                msg: "Loggin exitoso"
            });
        } catch (error) {
            next(error);
        }
    }
)

router.put('/users/:uid', jwtAuthBear, async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userData = req.body;
        const { uid } = req.params;
        await UserController.updateUser(uid, userData);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        next(error);
    }
});


router.delete('/users/:uid', jwtAuthBear, adminPolicy, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { uid } = req.params;
        await UserController.deleteUser(uid);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        next(error);
    }
});

export default router;
