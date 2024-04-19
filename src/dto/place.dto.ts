import { ObjectId } from 'mongoose'
import { placesInterface } from '../interfaces/places.interface'

export default class PlaceDTO {
	id: ObjectId
	name: string
	image: string
	city: ObjectId
	trip: Array<any>
	stars:Array<any>
	average: number
	description: string

	constructor(place: placesInterface) {
		this.id = place._id!;
		this.name = place.name;
		this.city = place.city;
		this.image = place.image || '';
		this.trip = place.trip || [];
		this.stars = place.stars || [];
		this.description = place.description || '';
		this.average = place.stars?.reduce( (acc, curr) => acc + curr.rating , 0)/this.stars!.length;
	}
}
