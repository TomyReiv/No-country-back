import { NextFunction, Request, Response } from 'express'
import { body, param, validationResult } from 'express-validator'
import { CODE } from '../utils/constants'

export const PlaceValidator = [
	param('id').isString().withMessage('ID no valido'),
	body('name').notEmpty().withMessage('El name es requerido'),
	body('location').notEmpty().withMessage('La locación es requerida'),
	body('country').notEmpty().withMessage('El pais es requerido')
]

export const handlePlaceValidationErrors = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(CODE.BAD_REQUEST).json({ errors: errors.array() })
	}
	next()
}
