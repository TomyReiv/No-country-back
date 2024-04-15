import {faker} from "@faker-js/faker"

export const generatePlaces = () => {
    return {
        name: faker.location.city(),
        location: faker.location.nearbyGPSCoordinate(),
        country: faker.location.county(),
        image: faker.location,
        comments: faker.location
    }

}