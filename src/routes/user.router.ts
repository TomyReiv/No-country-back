import express, { Request, Response, NextFunction } from 'express';
import UserController from '../controllers/user.controller';
import { userValidator, handleUserValidationErrors } from '../middlewares/user.validator';
import passport from "passport";
import userController from '../controllers/user.controller';
import { tokenGenerator } from '../utils/utility';
import { jwtAuthBear } from '../utils/utility';
import { adminPolicy } from '../middlewares/adminPolicy';
import { CODE } from '../utils/constants';
import upload from '../middlewares/handleMulter'
import cloudinary from '../config/cloudinary.config'
import { unlink } from 'fs/promises'

const router = express.Router();


router.get('/users', jwtAuthBear, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserController.getAllUsers();
        res.status(CODE.OK).json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/users/:uid', jwtAuthBear, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { uid } = req.params;
        const users = await UserController.getUserById(uid);
        res.status(CODE.OK).json(users);
    } catch (error) {
        next(error);
    }
});


router.post("/users/loginGoogle", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userToken = await UserController.loggGoogle(req.body);
        const user = await userController.getUserById(userToken._id);
        const token = tokenGenerator(userToken);
        return res.status(CODE.OK).json({
            ok: true,
            token,
            user: user,
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
            const { email, ...rest } = req.body;

            const userToken = await userController.findOne(req.body);
            const user = await userController.getUserById(userToken._id);

            const token = tokenGenerator(userToken);

            res.status(CODE.OK).json({
                ok: true,
                token,
                user: user,
                msg: "Login exitoso"
            });
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
            const user = await userController.getUserById(userToken._id);
            const token = tokenGenerator(userToken);

            res.status(CODE.OK).json({
                ok: true,
                token,
                user: user,
                msg: "Login exitoso"
            });
        } catch (error) {
            next(error);
        }
    }
)

router.put('/users/:uid', jwtAuthBear, upload.single('avatar'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const avatar = req.file; 
        const userData = req.body;

        if (avatar) {
			const res = await cloudinary.uploader.upload(avatar.path)
			if (res) {
				const local = `${avatar.destination}/${avatar.filename}`
				userData.avatar = res.secure_url
				await unlink(local)
			}
		}

        const { uid } = req.params;
        await UserController.updateUser(uid, userData);
        res.status(CODE.OK).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        next(error);
    }
});

router.put('/users/favorites/:id', jwtAuthBear, async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const { favorites } = req.body;       
        const { id } = req.params;
        await UserController.updateFavorite(id, favorites);
        res.status(CODE.OK).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        next(error);
    }
})


router.delete('/users/:uid', jwtAuthBear, adminPolicy, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { uid } = req.params;
        await UserController.deleteUser(uid);
        res.status(CODE.OK).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        next(error);
    }
});

router.get('/users/logout/:uid', jwtAuthBear, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { uid } = req.params;
        await userController.updateUser(uid, { last_connection: new Date() });
        res.status(CODE.OK).json({ message: 'Logout realizado' });
    } catch (error) {
        next(error);
    }
});

export default router;
