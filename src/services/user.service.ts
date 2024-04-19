import UserRepository from '../repositories/user.repository';
import UserDTO from '../dto/user.dto';
import { UserInterface } from '../interfaces/user.interface';
import { createHash } from '../utils/utility';
import { userGoogle, userObject } from '../interfaces/jwtPayload';
import { secretGoogle } from '../utils/constants';
import userModel from '../models/user.model';
import tripRepository from '../repositories/trip.repository';
import placeRepository from '../repositories/place.repository';

class UserService {
  async getAllUsers(): Promise<UserDTO[]> {
    try {
      const users = await UserRepository.getAllUsers();
      if (!users) throw new Error('Usuarios no encontrados');
      return users;
    } catch (error: any) {
      throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
  }

  async getUserById(uid: string): Promise<UserDTO | null> {
    try {
      const user = await UserRepository.getUserById(uid);
      if (!user) throw new Error("El usuario no existe");
      return user;
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
  }

  async findOne(email: string) {
    try {
      const user = await UserRepository.findOne(email);
      if (!user) throw new Error("El usuario no existe");
      return user;
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
  }

  async createUser(userData: UserInterface): Promise<any> {
    try {
      const { password, email, ...rest } = userData;
      const user = await UserRepository.findOne(userData);

      if (user) throw new Error('Ya hay un usuario registrado con este correo');
      return await UserRepository.createUser({
        ...rest,
        email,
        password: createHash(password),
      });
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${(error as Error).message}`);
    }
  }

  async loogGoogle(userData: userObject): Promise<any> {
    try {
      const { name, email, image } = userData.user;
      const user: any = await UserRepository.findOne(userData.user);

      if (!user) {
        const newUser: any = {
          first_name: name,
          last_name: 'Google',
          email,
          password: createHash(`Google${email}${secretGoogle}`),
          country: ':G',
          last_connection: new Date()
        };
        const userCreated = await UserRepository.createUser(newUser);
        return new UserDTO(userCreated.toObject());
      }
      return new UserDTO(user.toObject());
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${(error as Error).message}`);
    }
  }

  async updateUser(userId: string, userData: any): Promise<UserDTO | null> {
    try {
      const user = await UserRepository.getUserById(userId);

      if (!user) throw new Error("El usuario no existe");
      if (userData.password) userData.password = createHash(userData.password!);
      return await UserRepository.updateUser(userId, userData);
    } catch (error: any) {
      throw new Error(`Error al actualizar usuario: ${(error as Error).message}`);
    }
  }

  async updateFavorite(id: any, favorite: any) {
    try {
      const user = await UserRepository.getUserById(id);
      if (!user) throw new Error("Usuario no encontrado");
      const place = await placeRepository.getPlaceById(favorite);
      if(!place) throw new Error("El lugar no existe");

      const stringifiedFavorites = user.favorites?.map((fav: any) => fav.toString());

      if (stringifiedFavorites && stringifiedFavorites.includes(favorite.toString())) {
        throw new Error("El lugar ya está en la lista de favoritos del usuario");
      }
            
      user.favorites?.push(favorite);
      const userUp = await userModel.findByIdAndUpdate(id, { favorites: user.favorites }, { new: true });
      return {msg: 'Usuario actualoizado'};
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${(error as Error).message}`);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      const user = await UserRepository.getUserById(userId);
      if (!user) throw new Error("El usuario no existe");
      await UserRepository.deleteUser(userId);
    } catch (error: any) {
      throw new Error(`Error al eliminar usuario: ${(error as Error).message}`);
    }
  }
}

export default new UserService();
