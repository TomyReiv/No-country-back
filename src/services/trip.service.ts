import mongoose from "mongoose";
import { tripsInterface } from "../interfaces/trips.interface";
import userModel from "../models/user.model";
import tripRepository from "../repositories/trip.repository";
import userRepository from "../repositories/user.repository";
import placeRepository from "../repositories/place.repository";

class tripService {
    async getAllTrips(query: any): Promise<any[]> {
        try {
            const trips = await tripRepository.getAllTrips(query);
            if (!trips) throw new Error('Viajes no encontrados');
            return trips;
        } catch (error) {
            throw new Error(`Error al obtener viajes: ${(error as Error).message}`);
        }
    }
    async findOne(data: any): Promise<any> {
        try {
            const trip = await tripRepository.findOne(data);
            if (!trip) throw new Error('Viaje no encontrados');
            return trip;
        } catch (error) {
            throw new Error(`Error al obtener viaje: ${(error as Error).message}`);
        }
    }
    async getTripById(tid: any): Promise<any | null> {
        try {
            const trip = await tripRepository.getTripById(tid);
            if (!trip) throw new Error('Viaje no encontrados');
            return trip;
        } catch (error) {
            throw new Error(`Error al obtener viaje: ${(error as Error).message}`);
        }
    }
    async createTrip(tripData: tripsInterface): Promise<any> {
        try {
            const { userId, placeId, ...rest } = tripData;
            const user = await userRepository.getUserById(userId);
            const place = await placeRepository.getPlaceById(placeId);
            
            if (!user) throw new Error("Usuario no encontrado");
            if (!place) throw new Error("Lugar de interes no encontrado");
            const newTrip = await tripRepository.createTrip(tripData);
            if (newTrip) {
               
                const stringifiedStars = place.stars?.map((str: any) => str.uid.toString());

                if (stringifiedStars && stringifiedStars.includes(userId.toString())) {
                  throw new Error("El usuario ya valoro este viaje");
                }

                place.trip.push(newTrip.savedTrip._id);
                place.stars.push({
                    rating: tripData.stars,
                    uid: userId
                });
                const userUp = await userModel.findByIdAndUpdate(userId, { trips: user.trips }, { new: true });
                const placeUp = await placeRepository.updatePlace(placeId, { stars: place.stars });
                const placeUpTrip = await placeRepository.updatePlace(placeId, { trip: place.trip });
                console.log(placeUp);

                console.log('Usuario actualizado');
            }
            return newTrip;
        } catch (error) {
            throw new Error(`Error al obtener viaje: ${(error as Error).message}`);
        }
    }




    async updateTrip(tripId: string, tripData: any): Promise<any> {
        try {
            const trip = await tripRepository.getTripById(tripId);
            if (!trip) throw new Error('Viaje no encontrados');
            return await tripRepository.updateTrip(tripId, tripData);
        } catch (error) {
            throw new Error(`Error al obtener viaje: ${(error as Error).message}`);
        }
    }
    async deleteTrip(tripId: string): Promise<any> {
        try {
            const trip = await tripRepository.getTripById(tripId);
            if (!trip) throw new Error('Viaje no encontrados');
            return await tripRepository.deleteTrip(trip);
        } catch (error) {
            throw new Error(`Error al obtener viaje: ${(error as Error).message}`);
        }
    }
}

export default new tripService