import PlaceDTO from '../dto/place.dto'
import { placesInterface } from '../interfaces/places.interface'
import PlaceService from '../services/place.service'

class PlaceController {
	async getAllPlaces(): Promise<PlaceDTO[]> {
		try {
			return await PlaceService.getAllPlaces()
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
	async getPlaceById(id: string): Promise<PlaceDTO | null> {
		try {
			return await PlaceService.getPlaceById(id)
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
	async createPlace(place: placesInterface): Promise<any> {
		try {
			return await PlaceService.createPlace(place)
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
	async updatePlace(
		id: string,
		updatePlace: Partial<PlaceDTO>
	): Promise<PlaceDTO | null> {
		try {
			return await PlaceService.updatePlace(id, updatePlace)
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
	async deletePlace(id: string): Promise<void> {
		try {
			await PlaceService.deletePlace(id)
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
}

export default new PlaceController()
