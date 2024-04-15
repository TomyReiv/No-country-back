import mongoose from "mongoose";
import { tripsInterface } from "../interfaces/trips.interface";
import userModel from "../models/user.model";
import tripRepository from "../repositories/trip.repository";
import userRepository from "../repositories/user.repository";

class tripService {
    async getAllTrips(query:any): Promise<any[]> {
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
            const { userId, ...rest } = tripData;
            const newTrip = await tripRepository.createTrip(tripData);
            if (newTrip) {
                const user = await userRepository.getUserById(userId);
                if (!user) throw new Error("Usuario no encontrado");
                user.trips.push(newTrip.savedTrip._id);
                const userUp = await userModel.findByIdAndUpdate(userId, { trips: user.trips }, { new: true });
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