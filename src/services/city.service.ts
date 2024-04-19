import cityRepository from "../repositories/city.repository";
import { cityInterface } from "../interfaces/city.interface";

class CityService {

    async getCity(query:any) {
        try {
            const city = await cityRepository.getCity(query);
            if (!city) throw new Error("City not found");
            return city;
        } catch (error) {
            throw new Error(`Error al obtener ciudad por ID: ${(error as Error).message}`);
        }
    }

    async getCityBiId(id: any) {
        try {
            const city = await cityRepository.getCityBiId(id);
            if (!city) throw new Error("City not found");
            return city;
        } catch (error) {
            throw new Error(`Error al obtener ciudad por ID: ${(error as Error).message}`);
        }
    }

    async createCity(data:cityInterface){
        try {
            const city = await cityRepository.createCity(data);
            return city;
        } catch (error) {
            throw new Error(`Error al crear ciudad por ID: ${(error as Error).message}`);
        }
    }

    async updateCity(id:any, data:any){
        try {
            const city = await cityRepository.getCityBiId(id);
            if (!city) throw new Error("City not found");
            if(data.image){
                city.image!.push(data.image);
                return await cityRepository.upgradeCity(id, {image: city.image});
            }
            return await cityRepository.upgradeCity(id, data);
        } catch (error) {
            throw new Error(`Error al actualizar ciudad por ID: ${(error as Error).message}`);
        }
    }

    async daleteCity(id:any){
        try {
            const city = await cityRepository.getCityBiId(id);
            if (!city) throw new Error("City not found");
            return await cityRepository.deleteCity(id);
        } catch (error) {
            throw new Error(`Error al actualizar ciudad por ID: ${(error as Error).message}`);
        }
    }

}
export default new CityService();