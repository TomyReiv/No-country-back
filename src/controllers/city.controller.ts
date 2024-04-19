import cityService from "../services/city.service";
import { cityInterface } from "../interfaces/city.interface";

class CityService {

    async getCity(query:any) {
        try {
            const city = await cityService.getCity(query);
            if (!city) throw new Error("City not found");
            return city;
        } catch (error) {
            throw new Error(`Error al obtener ciudad por ID: ${(error as Error).message}`);
        }
    }

    async getCityBiId(id: any) {
        try {
            const city = await cityService.getCityBiId(id);
            if (!city) throw new Error("City not found");
            return city;
        } catch (error) {
            throw new Error(`Error al obtener ciudad por ID: ${(error as Error).message}`);
        }
    }

    async createCity(data:cityInterface){
        try {
            const city = await cityService.createCity(data);
            return city;
        } catch (error) {
            throw new Error(`Error al crear ciudad por ID: ${(error as Error).message}`);
        }
    }

    async updateCity(id:any, data:any){
        try {
            const city = await cityService.updateCity(id, data);
            return city;
        } catch (error) {
            throw new Error(`Error al actualizar ciudad por ID: ${(error as Error).message}`);
        }
    }

    async daleteCity(id:any){
        try {
            const city = await cityService.daleteCity(id);
            return city;
        } catch (error) {
            throw new Error(`Error al actualizar ciudad por ID: ${(error as Error).message}`);
        }
    }

}
export default new CityService();