import Trip from '../models/trip.model';
import { tripsInterface } from '../interfaces/trips.interface';

class tripRepository {
    async getAllTrips(query:any): Promise<any[]> {
        try {
            const trip = await Trip.find(query).populate("comments.cid").populate("placeId");
            return trip;
        } catch (error) {
            throw new Error(`Error al obtener viajes: ${(error as Error).message}`);
        }
    }

    async findOne(data: any): Promise<any> {
        try {
            const { userId } = data;
            const trip = await Trip.findOne({ userId });
            if (!trip) return null;
            return trip;
        } catch (error) {
            throw new Error(`Error al obtener viaje por ID: ${(error as Error).message}`);
        }
    }

    async getTripById(tid: any): Promise<any | null> {
        try {
            const trip = await Trip.find().populate("comments.cid").populate("placeId");
            if (!trip) return null;
            return trip
        } catch (error) {
            throw new Error(`Error al obtener usuario por ID: ${(error as Error).message}`);
        }
    }

    async createTrip(tripData: tripsInterface): Promise<any> {
        try {
            const newTrip = new Trip(tripData);
            const savedTrip = await newTrip.save();
            return {savedTrip, msg: 'Viaje creado'};
        } catch (error) {
            throw new Error(`Error al obtener al crear el viaje: ${(error as Error).message}`);
        }
    }

    async updateTrip(tripId: string, tripData: any): Promise<any> {
        try {
            const trip = await Trip.findByIdAndUpdate(tripId, tripData, { new: true })
            if (!trip) {
                throw new Error(`No se encontró el viaje con ID ${tripId}`);
            }
            return { msg: "Viaje actualizado" }
        } catch (error) {
            throw new Error(`Error al actualizar el viaje: ${(error as Error).message}`);
        }
    }

    async deleteTrip(tripId: string): Promise<any> {
        try {
            const trip = await Trip.findByIdAndDelete(tripId)
            return { msg: "Viaje eliminado" }
        } catch (error) {
            throw new Error(`Error al eliminar viaje: ${(error as Error).message}`);
        }

    }
}

export default new tripRepository();
