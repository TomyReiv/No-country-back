import respondRepository from "../repositories/respond.repository";
import { respondsInterface } from "../interfaces/responds.interface";
import commentModel from "../models/comment.model";
import userRepository from "../repositories/user.repository";

class respondService{
    async getAll(){
        try {
            const resp = await respondRepository.getAll();
            if(!resp) throw new Error(`Error: respuestas no encontradas`);
            return resp;
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }
    async getById(id:string){
        try {
            const resp = await respondRepository.getById(id);
            if(!resp) throw new Error(`Error: respuesta no encontradas`);
            return resp;
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }
    async create(data:respondsInterface){
        try {
            const { userId, commentId, ...rest } = data;
            const newResp = await respondRepository.create(data);
            if (newResp) {
                const user = await userRepository.getUserById(userId);
                if (!user) throw new Error("Usuario no encontrado");
                const comment = await commentModel.findById(commentId);
                if (!comment) throw new Error("Comentario no encontrado");
                comment.respondsId.push(newResp._id);
                const userUp = await commentModel.findByIdAndUpdate(commentId, { respondsId: comment.respondsId }, { new: true });
                console.log('Comentario actualizado');
            }
            return newResp;
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }
    async upgrade(id: string, data:any){
        try {
            const resp = await respondRepository.getById(id);
            if(!resp) throw new Error(`Error: respuesta no encontradas`);
            return await respondRepository.upgrade(id, data);
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }
    async delete(id:string){
        try {
            const resp = await respondRepository.getById(id);
            if(!resp) throw new Error(`Error: respuesta no encontradas`);
            return await respondRepository.delete(id);
        } catch (error) {
            throw new Error(`Error: ${(error as Error).message}`);
        }
    }
}

export default new respondService;