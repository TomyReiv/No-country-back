import { ObjectId } from "mongoose"

export interface placesInterface {
	_id?: ObjectId
	name: string
	location: string
	country: string
	image?: string
	comments: Array<any>
}
