import PlaceDTO from '../dto/place.dto'
import { placesInterface } from '../interfaces/places.interface'
import PlaceRepository from '../repositories/place.repository'

class PlaceService {
	async getAllPlaces(): Promise<PlaceDTO[]> {
		try {
			const place = await PlaceRepository.getAllPlaces();
			if(!place) throw new  Error('Lugar no encontrado');
			return place;
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
	async getPlaceById(id: string): Promise<PlaceDTO | null> {
		try {
			const place = await PlaceRepository.getPlaceById(id);
			if(!place) throw new  Error('Lugar no encontrado')
			return place
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
	async createPlace(place: placesInterface): Promise<any> {
		try {
			return await PlaceRepository.createPlace(place)
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
			const place = await PlaceRepository.getPlaceById(id);
			if(!place) throw new  Error('Lugar no encontrado')
			return await PlaceRepository.updatePlace(id, updatePlace)
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
	async deletePlace(id: string): Promise<void> {
		try {
			const place = await PlaceRepository.getPlaceById(id);
			if(!place) throw new  Error('Lugar no encontrado')
			await PlaceRepository.deletePlace(id)
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
}

export default new PlaceService()
