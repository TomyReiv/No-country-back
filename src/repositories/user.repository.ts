import User from '../models/user.model';
import UserDTO from '../dto/user.dto';
import { UserInterface } from '../interfaces/user.interface';

class UserRepository {
    async getAllUsers(): Promise<UserDTO[]> {
        try {
            const users = await User.find().populate("comments").populate("trips");
            const usersDTO = users.map(user => new UserDTO(user.toObject()));
            return usersDTO;
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
        }
    }

    async findOne(data: any): Promise<any> {
        try {
            const { email } = data;
            const user = await User.findOne({ email });
            if (!user) return null;
            return user;
        } catch (error) {
            throw new Error(`Error al obtener usuario por ID: ${(error as Error).message}`);
        }
    }

    async getUserById(uid: any): Promise<UserDTO | null> {
        try {
            const user = await User.findById(uid).populate("comments").populate("trips");
            if (!user) return null;
            return new UserDTO(user.toObject());
        } catch (error) {
            throw new Error(`Error al obtener usuario por ID: ${(error as Error).message}`);
        }
    }

    async createUser(userData: UserInterface): Promise<any> {
        try {
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${(error as Error).message}`);
        }
    }

    async updateUser(userId: any, userData: any): Promise<any> {
        try {
            const user = await User.findByIdAndUpdate(userId, userData, { new: true })
            if (!user) {
                throw new Error(`No se encontró el usuario con ID ${userId}`);
            }
            return { msg: "Usuario actualizado" }
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${(error as Error).message}`);
        }
    }

/*     async updateFavorite(id: any, favorite: any) {
        try {
            const user = await User.findById(id);                      
            if (!user) {
                throw new Error(`No se encontró el usuario con ID ${id}`);
            }
            user.favorites?.push(favorite);
            console.log(user);
                        
            await user.save();
            return {msg: 'Agregado a favoritos'};
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${(error as Error).message}`);
        }
    } */

    async deleteUser(userId: string): Promise<any> {
        try {
            const user = await User.findByIdAndDelete(userId)
            return { msg: "Usuario eliminado" }
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${(error as Error).message}`);
        }

    }
}

export default new UserRepository();
