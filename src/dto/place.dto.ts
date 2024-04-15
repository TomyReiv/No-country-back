import { ObjectId } from 'mongoose'
import { placesInterface } from '../interfaces/places.interface'

export default class PlaceDTO {
	id: ObjectId
	name: string
	location: string
	country: string
	image: string
	comments: Array<any>

	constructor(place: placesInterface) {
		this.id = place._id!;
		this.name = place.name;
		this.location = place.location;
		this.country = place.country;
		this.image = place.image || '';
		this.comments = place.comments || [];
	}
}
