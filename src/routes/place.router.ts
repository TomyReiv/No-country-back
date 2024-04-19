import express, { Request, Response, Router } from 'express'
import { handlePlaceValidationErrors } from '../middlewares/place.validator'
import PlaceController from '../controllers/place.controller'
import { CODE } from '../utils/constants'
import { adminPolicy } from '../middlewares/adminPolicy'
import { isLogged } from '../middlewares/isLogged'
import upload from '../middlewares/handleMulter'
import cloudinary from '../config/cloudinary.config'
import { unlink } from 'fs/promises'

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
	try {
		const { query = {} } = req;
		const places = await PlaceController.getAllPlaces(query)
		res.status(CODE.OK).json(places)
	} catch (error) {
		res
			.status(CODE.INTERNAL_SERVER_ERROR)
			.json({ message: (error as Error).message })
	}
})

router.get('/:id', async (req: Request, res: Response) => {
	try {
		const placeId: string = req.params.id
		const place = await PlaceController.getPlaceById(placeId)
		res.status(CODE.OK).json(place)
	} catch (error) {
		res
			.status(CODE.INTERNAL_SERVER_ERROR)
			.json({ message: (error as Error).message })
	}
})

router.post(
	'/',
	/* isLogged, */
	upload.single('image'),
	handlePlaceValidationErrors,
	async (req: Request, res: Response) => {
		const placeData = req.body
		const image = req.file
		if (image) {
			const res = await cloudinary.uploader.upload(image.path)
			if (res) {
				const local = `${image.destination}/${image.filename}`
				placeData.image = res.secure_url
				await unlink(local)
			}
		}
		try {
			const placeCreated = await PlaceController.createPlace(placeData)
			res.status(CODE.OK).json(placeCreated)
		} catch (error) {
			res
				.status(CODE.INTERNAL_SERVER_ERROR)
				.json({ message: (error as Error).message })
		}
	}
)

router.put(
	'/:id',
	isLogged,
	upload.single('image'),
	handlePlaceValidationErrors,
	async (req: Request, res: Response) => {
		const placeId = req.params.id
		const placeData = req.body
		const image = req.file
		if (image) {
			const res = await cloudinary.uploader.upload(image.path)
			if (res) {
				const local = `${image.destination}/${image.filename}`
				placeData.image = res.secure_url
				await unlink(local)
			}
		}
		try {
			await PlaceController.updatePlace(placeId, placeData)
			res.status(CODE.OK).json({ message: 'Place Actualizado Correctamente' })
		} catch (error) {
			res
				.status(CODE.INTERNAL_SERVER_ERROR)
				.json({ message: (error as Error).message })
		}
	}
)

router.delete('/:id', adminPolicy, async (req: Request, res: Response) => {
	const placeId = req.params.id
	try {
		await PlaceController.deletePlace(placeId)
		res.status(CODE.OK).json({ message: 'Place Eliminado Correctamente' })
	} catch (error) {
		res
			.status(CODE.INTERNAL_SERVER_ERROR)
			.json({ message: (error as Error).message })
	}
})

export default router;
