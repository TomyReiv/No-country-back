import respondModel from "../models/respond.model";
import { respondsInterface } from "../interfaces/responds.interface";

class respondRepository{
    async getAll(){
        try {
            const resp = await respondModel.find();
            return resp;
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }

    async getById(id:string){
        try {
            const resp = await respondModel.findById(id);
            return resp
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }

    async create(data:respondsInterface){
        try {
            const newResp = new respondModel(data);
            const resp = await newResp.save();
            return resp;
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }

    async upgrade(id: string, data:any){
        try {
            const resp = await respondModel.findByIdAndUpdate(id, data, { new: true })
            if (!resp) {
                throw new Error(`No se encontró el respuesta con ID ${id}`);
            }
            return { msg: "Respuesta actualizado" }
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }

    async delete(id:string){
        try {
            const resp = await respondModel.findByIdAndDelete(id);
            if (!resp) {
                throw new Error(`No se encontró el respuesta con ID ${id}`);
            }
            return { msg: "Respuesta actualizado" }
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }
}

export default new respondRepository;