import userService from '../services/user.service';
import UserDTO from '../dto/user.dto';
import { UserInterface } from '../interfaces/user.interface';

class UserController {
  async getAllUsers(): Promise<UserDTO[]> {
    try {
      return await userService.getAllUsers()
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
  }

  async getUserById(uid: string): Promise<UserDTO | null> {
    try {
      return await userService.getUserById(uid);
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
  }

  async findOne(email: string) {
    try {
      return await userService.findOne(email);
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
  }

  async createUser(userData: UserInterface): Promise<any> {
    try {
      return await userService.createUser(userData);
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
  }

  async loggGoogle(userData: any): Promise<any> {
    try {
      return await userService.loogGoogle(userData);
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
  }

  async updateUser(userId: string, userData: Partial<UserDTO>): Promise<UserDTO | null> {
    try {
      return await userService.updateUser(userId, userData);
    } catch (error: any) {
      throw new Error(`Error al actualizar usuario: ${(error as Error).message}`);
    }
  }

  async updateFavorite(id: any, favorite: any) {
    try {
      return await userService.updateFavorite(id, favorite);
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${(error as Error).message}`);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await userService.deleteUser(userId);
    } catch (error: any) {
      throw new Error(`Error al eliminar usuario: ${(error as Error).message}`);
    }
  }
}

export default new UserController();