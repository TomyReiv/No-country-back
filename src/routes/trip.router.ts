import express, { Request, Response, NextFunction } from 'express';
import { jwtAuthBear } from '../utils/utility';
import { adminPolicy } from '../middlewares/adminPolicy';
import tripController from '../controllers/trip.controller';
import { CODE } from '../utils/constants';
import upload from '../middlewares/handleMulter'
import cloudinary from '../config/cloudinary.config'
import { unlink } from 'fs/promises'

const router = express.Router();

router.get('/trip', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query = {} } = req;
        const trips = await tripController.getAllTrips(query);
        res.status(CODE.OK).json(trips);
    } catch (error) {
        next(error);
    }
});

router.get('/trip/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const trip = await tripController.getTripById(id);
        res.status(CODE.OK).json(trip);
    } catch (error) {
        next(error);
    }
});

router.post('/trip', jwtAuthBear, upload.single('photo'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const photo = req.file;       
        const data = req.body;
		if (photo) {
			const res = await cloudinary.uploader.upload(photo.path)
			if (res) {
				const local = `${photo.destination}/${photo.filename}`
				data.photo = res.secure_url
				await unlink(local)
			}
		}
        
        const newTrip = await tripController.createTrip(data);
        res.status(CODE.OK).json({
            ok: true,
            msg: 'Viaje creado'
        });
    } catch (error) {
        next(error);
    }
});

router.put('/trip/:id', jwtAuthBear, upload.single('photo'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const photo = req.file;
        const data = req.body;    
        if (photo) {
			const res = await cloudinary.uploader.upload(photo.path)
			if (res) {
				const local = `${photo.destination}/${photo.filename}`
				data.photo = res.secure_url
				await unlink(local)
			}
		}
        const { id } = req.params;
        
        const updatedTrip = await tripController.updateTrip(id, data);
        res.status(CODE.OK).json({
            ok: true,
            updatedTrip
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/trip/:id', jwtAuthBear, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedTrip = await tripController.deleteTrip(id);
        res.status(CODE.OK).json({
            ok: true,
            deletedTrip
        });
    } catch (error) {
        next(error);
    }
});

export default router;