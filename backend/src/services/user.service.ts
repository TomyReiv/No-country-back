import UserRepository from '../repositories/user.repository';
import UserDTO from '../dto/user.dto';
import { UserInterface } from '../interfaces/user.interface';

class UserService {
  async getAllUsers(): Promise<UserDTO[]> {
    try {
      return await UserRepository.getAllUsers();
    } catch (error: any) {
      throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
  }

  async getUserById(userId: string): Promise<UserDTO | null>{
    try {
        return await UserRepository.getUserById(userId);
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
  }

  async createUser(userData: UserInterface):  Promise<any> {
    try {
        return await UserRepository.createUser(userData);
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
  }

  async updateUser(userId: string, userData: Partial<UserDTO>): Promise<UserDTO | null> {
    try {
      return await UserRepository.updateUser(userId, userData);
    } catch (error: any) {
      throw new Error(`Error al actualizar usuario: ${(error as Error).message}`);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await UserRepository.deleteUser(userId);
    } catch (error: any) {
      throw new Error(`Error al eliminar usuario: ${(error as Error).message}`);
    }
  }
}

export default new UserService();
