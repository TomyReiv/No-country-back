import express, { Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import { userValidator, handleUserValidationErrors } from '../middlewares/user.validator';

const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await UserController.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id;
        const users = await UserController.getUserById(userId);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.post('/', userValidator, handleUserValidationErrors, async (req: Request, res: Response)=>{
    const userData = req.body;
    try {
        const createUser = await UserController.createUser(userData);
        res.status(200).json(createUser);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const userData = req.body;
    try {
        await UserController.updateUser(userId, userData);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});


router.delete('/:id', async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    try {
        await UserController.deleteUser(userId);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;
