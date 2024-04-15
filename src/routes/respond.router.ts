import express, { Request, Response, NextFunction } from 'express';
import UserController from '../controllers/user.controller';
import passport from "passport";
import respondController from '../controllers/respond.controller';
import { jwtAuthBear } from '../utils/utility';

const router = express.Router();

router.get('/resp', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resp = await respondController.getAll();
        res.status(200).json(resp);
    } catch (error) {
        next(error);
    }
})
router.get('/resp/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const resp = await respondController.getById(id);
        res.status(200).json(resp);
    } catch (error) {
        next(error);
    }
})
router.post('/resp', jwtAuthBear, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {data} = req.body;
        const resp = await respondController.create(data);
        res.status(200).json(resp);
    } catch (error) {
        next(error);
    }
})
router.put('/resp/:id', jwtAuthBear, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const {data} = req.body;
        const resp = await respondController.upgrade(id, data);
        res.status(200).json(resp);
    } catch (error) {
        next(error);
    }
})
router.delete('/resp/:id', jwtAuthBear, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const resp = await respondController.delete(id);
        res.status(200).json(resp);
    } catch (error) {
        next(error);
    }
})