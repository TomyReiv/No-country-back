import respondService from "../services/respond.service";
import { respondsInterface } from "../interfaces/responds.interface";


class respondController{
    async getAll(){
        try {
            const resp = await respondService.getAll();
            return resp;
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }
    async getById(id:string){
        try {
            const resp = await respondService.getById(id);
            return resp;
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }
    async create(data:respondsInterface){
        try {
            const newResp = await respondService.create(data);
            return newResp;
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }
    async upgrade(id: string, data:any){
        try {
            const resp = await respondService.getById(id);
            return await respondService.upgrade(id, data);
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }
    async delete(id:string){
        try {
            const resp = await respondService.getById(id);
            return await respondService.delete(id);
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }
}

export default new respondController;