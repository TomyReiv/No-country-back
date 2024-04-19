import cityModel from "../models/city.model";
import { cityInterface } from "../interfaces/city.interface";

class cityRepository {

    async getCity(query:any) {
        try {
            return await cityModel.find(query).populate('places');
        } catch (error) {
            throw new Error(`Error al obtener ciudad por ID: ${(error as Error).message}`);
        }
    }

    async getCityBiId(id:any){
        try {
            return await cityModel.findById(id).populate('places');
        } catch (error) {
            throw new Error(`Error al obtener ciudad por ID: ${(error as Error).message}`);
        }
    }

    async createCity(data:cityInterface){
        try {
            await cityModel.create(data);
            return {msg: 'Ciudad creada exitosamente'};
        } catch (error) {
            throw new Error(`Error al obtener ciudad por ID: ${(error as Error).message}`);
        }
    }

    async upgradeCity(id:any, data:any){
        try {
            await  cityModel.findByIdAndUpdate(id, {$set : data}, {new: true});
            return {msg: 'Ciudad actualizada correctamente'}
        } catch (error) {
            throw new Error(`Error al obtener ciudad por ID: ${(error as Error).message}`);
        }
    }

    async deleteCity(id:any){
        try {
            await cityModel.findByIdAndDelete(id);
            return {msg: 'La ciudad ha sido eliminada correctamente'};
        } catch (error) {
            throw new Error(`Error al obtener ciudad por ID: ${(error as Error).message}`);
        }
    }

}

export default new cityRepository();