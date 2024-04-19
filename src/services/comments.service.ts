import CommentDto from "../dto/comments.dto";
import { commentsInterface } from "../interfaces/coments.interface";
import CommentsRepository from "../repositories/comments.repository";
import placeRepository from "../repositories/place.repository";
import tripRepository from "../repositories/trip.repository";
import userRepository from "../repositories/user.repository";

class CommentService {
  async getAllComment(query:any): Promise<CommentDto[]> {
    try {
      return await CommentsRepository.getAllComments(query);
    } catch (error) {
      throw new Error(
        `Error al obtener comentarios ${(error as Error).message}`
      );
    }
  }

  async getCommentById(id: string): Promise<CommentDto> {
    try {
      const comment = await CommentsRepository.getCommentById(id);
      if (!comment) throw new Error("El comentario no existe");
      return comment;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async createComment(commentData: commentsInterface): Promise<CommentDto> {
    try {
      const {userId, tripId} =  commentData;
      const user = await userRepository.getUserById(userId);
      const trip = await tripRepository.getTripById(tripId);
      
            
      if (!user) throw new Error("Usuario no encontrado");
      if (!trip) throw new Error("Viaje de interes no encontrado");

      const comment = await CommentsRepository.createComment(commentData);

      if(comment){
        const place =  await placeRepository.getPlaceById(trip.placeId._id.toString());
        
        const stringifiedStars = place!.stars?.map((str: any) => str.uid.toString());

        if (stringifiedStars && stringifiedStars.includes(userId.toString())) {
          throw new Error("El usuario ya valoro este viaje");
        }

        place!.stars?.push({
          rating: commentData!.stars,
          uid: userId
        })

        const placeUp = await placeRepository.updatePlace(trip.placeId._id, { stars: place!.stars });
            
        console.log(placeUp);
      }
      return  comment;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteComment(commentId: string): Promise<CommentDto> {
    try {
      return await CommentsRepository.deleteComment(commentId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async updateComment(commentId: string, commentData: commentsInterface): Promise<CommentDto> {
    try {
      return await CommentsRepository.updateComment(commentId, commentData)
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
export default new CommentService();
