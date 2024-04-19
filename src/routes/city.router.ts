import { jwtAuthBear } from '../utils/utility';
import { adminPolicy } from '../middlewares/adminPolicy';
import { CODE } from '../utils/constants';
import express, { Request, Response, NextFunction } from 'express';
import cityController from '../controllers/city.controller';
import upload from '../middlewares/handleMulter';
import cloudinary from '../config/cloudinary.config';
import { unlink } from 'fs/promises';

const router = express.Router();

router.get('/city', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query = {} } = req;
        const city = await cityController.getCity(query);
        res.status(CODE.OK).json(city);
    } catch (error) {
        next(error)
    }
});

router.get('/city/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const city = await cityController.getCityBiId(id);
        res.status(CODE.OK).json(city);
    } catch (error) {
        next(error)
    }
});

router.post('/city', jwtAuthBear, upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;  
        const image = req.file
		if (image) {
			const res = await cloudinary.uploader.upload(image.path)
			if (res) {
				const local = `${image.destination}/${image.filename}`
				data.image = res.secure_url
				await unlink(local)
			}
		}
             
        const city = await cityController.createCity(data);
        res.status(CODE.OK).json(city);
    } catch (error) {
        next(error)
    }
});

router.put('/city/:id', jwtAuthBear, upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;  
        const image = req.file
		if (image) {
			const res = await cloudinary.uploader.upload(image.path)
			if (res) {
				const local = `${image.destination}/${image.filename}`
				data.image = res.secure_url
				await unlink(local)
			}
		}
        const { id } = req.params;
        const city = await cityController.updateCity(id, data);
        res.status(CODE.OK).json(city);
    } catch (error) {
        next(error)
    }
});

router.delete('/city/:id', jwtAuthBear, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const city = await cityController.daleteCity(id);
        res.status(CODE.OK).json(city);
    } catch (error) {
        next(error)
    }
});

export default router;