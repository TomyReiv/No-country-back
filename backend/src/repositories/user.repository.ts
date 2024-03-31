import User from '../models/user.model';
import UserDTO from '../dto/user.dto';
import { UserInterface } from '../interfaces/user.interface';

class UserRepository {
    async getAllUsers(): Promise<UserDTO[]> {
        try {
            const users = await User.find();
            const usersDTO = users.map(user => new UserDTO(user.toObject()));
            return usersDTO;
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
        }
    }

    async getUserById(userId: string): Promise<UserDTO | null> {
        try {
            const user = await User.findById(userId);
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
            throw new Error(`Error al obtener usuario por ID: ${(error as Error).message}`);
        }
    }

    async updateUser(userId: string, userData: any): Promise<any> {
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

    async deleteUser(userId: string): Promise<any> {
        try {
            const user = await User.findByIdAndDelete(userId)
            if (!user) {
                throw new Error(`No se encontró el usuario con ID ${userId}`);
            }
            return { msg: "Usuario eliminado" }
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${(error as Error).message}`);
        }

    }
}

export default new UserRepository();
