import Jwt from 'jsonwebtoken'
import { CODE, ROLE, secretKey } from '../utils/constants'
import userModel from '../models/user.model'
import { Request, Response, NextFunction } from 'express'

export const isLogged = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			return res
				.status(CODE.UNAUTHORIZED_ACCESS)
				.json({ error: 'No autorizado' })
		}

		const decodedToken = Jwt.verify(token, secretKey) as { id: string }

		const user = await userModel.findById(decodedToken.id)

		if (!user) {
			return res.status(CODE.NOT_FOUND).json({ error: 'Usuario no encontrado' })
		}

		if (user.role === String(ROLE.USER) || user.role === String(ROLE.ADMIN)) {
			next()
		} else {
			return res
				.status(CODE.FORBIDDEN)
				.json({
					error: 'Necesitar estar logeado para proceder con la operación'
				})
		}
	} catch (error) {
		return res
			.status(CODE.UNAUTHORIZED_ACCESS)
			.json({ error: 'Authentication failed' })
	}
}
