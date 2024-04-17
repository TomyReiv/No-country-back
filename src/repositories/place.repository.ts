import PlaceDTO from '../dto/place.dto'
import { placesInterface } from '../interfaces/places.interface'
import Place from '../models/place.model'

class PlaceRepository {
	async getAllPlaces(): Promise<PlaceDTO[]> {
		try {
			const places = await Place.find().populate('comments')
			const placesDTO = places.map(place => new PlaceDTO(place.toObject()))
			return placesDTO
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
	async getPlaceById(id: string): Promise<PlaceDTO | null> {
		try {
			const place = await Place.findById(id).populate('comments')
			if (!place) return null
			return new PlaceDTO(place.toObject())
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
	async createPlace(place: placesInterface): Promise<any> {
		try {
			const newPlace = new Place(place)
			const savePlace = await newPlace.save()
			return savePlace
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
	async updatePlace(id: string, updatePlace: Partial<PlaceDTO>): Promise<any> {
		try {
			const place = await Place.findByIdAndUpdate(id, updatePlace, {
				new: true
			})
			if (!place) {
				throw new Error(`No se encontró el place con el ID ${id}`)
			}

			return { message: 'Place actualizado correctamente' }
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
	async deletePlace(id: string): Promise<any> {
		try {
			const place = await Place.findByIdAndDelete(id)
			if (!place) {
				throw new Error(`No se encontró el place con el ID ${id}`)
			}
			return { message: 'Place Eliminado Correctamente' }
		} catch (error) {
			throw new Error(
				`Error al obtener los lugares: ${(error as Error).message}`
			)
		}
	}
}

export default new PlaceRepository()
