import { ObjectId } from "mongoose"

export interface cityInterface {
	_id?: ObjectId
	name: string
	location: string
	country: string
	image?: Array<string>
    places?: Array<ObjectId>
}
