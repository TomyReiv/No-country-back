import PlaceDTO from '../dto/place.dto'
import { placesInterface } from '../interfaces/places.interface'
import cityRepository from '../repositories/city.repository';
import PlaceRepository from '../repositories/place.repository'

class PlaceService {
	async getAllPlaces(query:any): Promise<PlaceDTO[]> {
		try {
			const place = await PlaceRepository.getAllPlaces(query);
			if (!place) throw new Error('Lugar no encontrado');
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
			if (!place) throw new Error('Lugar no encontrado')
			return place
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
	async createPlace(data: placesInterface): Promise<any> {
		try {
			const { city } = data;
			const cityExist = await cityRepository.getCityBiId(city);
			if (!cityExist) throw new Error('Ciudad no encontrado')
			const place = await PlaceRepository.createPlace(data)
			cityExist.places?.push(place._id);
			await cityRepository.upgradeCity(city, { places: cityExist.places });
			return place;
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
			if (!place) throw new Error('Lugar no encontrado')
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
			if (!place) throw new Error('Lugar no encontrado')
			await PlaceRepository.deletePlace(id)
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
}

export default new PlaceService()
