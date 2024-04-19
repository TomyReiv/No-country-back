import { ObjectId } from "mongoose"

export interface placesInterface {
	_id?: ObjectId
	name: string
	city:ObjectId
	image?: string
	trip: Array<any>
	stars?: Array<any>
}
