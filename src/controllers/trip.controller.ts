import { tripsInterface } from "../interfaces/trips.interface";
import tripService from "../services/trip.service";

class tripController{
    async getAllTrips(query:any): Promise<any[]>{
        try {
            const trips = await tripService.getAllTrips(query);
            return trips;
        } catch (error) {
            throw new Error(`Error al obtener viajes: ${(error as Error).message}`);
        }
    }
    async findOne(data: any): Promise<any>{
        try {
            const trip = await tripService.findOne(data);
            return trip;
        } catch (error) {
            throw new Error(`Error al obtener viajes: ${(error as Error).message}`);
        }
    }
    
    async getTripById(tid: any): Promise<any | null>{
        try {
            const trip = await tripService.getTripById(tid);
            return trip
        } catch (error) {
            throw new Error(`Error al obtener viajes: ${(error as Error).message}`);
        }
    }
    async createTrip(tripData: tripsInterface): Promise<any>{
        try {
            const trip = await  tripService.createTrip(tripData);
            return trip;
        } catch (error) {
            throw new Error(`Error al obtener viajes: ${(error as Error).message}`);
        }
    }
    async updateTrip(tripId: string, tripData: any): Promise<any>{
        try {
            const trip = await  tripService.updateTrip(tripId, tripData);
            return trip;
        } catch (error) {
            throw new Error(`Error al obtener viajes: ${(error as Error).message}`);
        }
    }
    async deleteTrip(tripId: string): Promise<any>{
        try {
            const trip = await  tripService.deleteTrip(tripId);
            return trip;
        } catch (error) {
            throw new Error(`Error al obtener viajes: ${(error as Error).message}`);
        }
    }
}

export default new tripController;