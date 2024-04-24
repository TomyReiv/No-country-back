import CommentDto from "../dto/comments.dto";
import { commentsInterface } from "../interfaces/coments.interface";
import Comment from "../models/comment.model";
import User from "../models/user.model";
import Trip from "../models/trip.model";

class CommentsRepository {
  async getAllComments(query:any): Promise<CommentDto[] | []> {
    try {
      const comments = await Comment.find(query).populate('tripId').populate('userId');
      const commentsDto = comments.map(
        (comment) => new CommentDto(comment.toObject())
      );
      return commentsDto;
    } catch (error) {
      throw new Error(
        `Error al obtener comentarios: ${(error as Error).message}`
      );
    }
  }
  async getCommentById(commentId: string): Promise<CommentDto | null> {
    try {
      const comment = await Comment.findById(commentId).populate('placeId').populate('userId').exec();

      if (!comment) {
        return null;
      }

      return new CommentDto(comment.toObject());
    } catch (error) {
      throw new Error(
        `Error al obtener el comentario: ${(error as Error).message}`
      );
    }
  }

  async createComment(commentData: commentsInterface): Promise<any> {
    try {
      const date = new Date();
      const { userId, tripId } = commentData;
      const user = await User.findById(userId);
      const trip = await Trip.findById(tripId);

      if (!user) {
        throw new Error(
          `No existe el usuario con la id: ${userId}`
        );
      }
      if (!trip) {
        throw new Error(`No existe el lugar con el id: ${tripId}`);
      }

      const newComment = new Comment({ ...commentData, date });

      const savedComment = await newComment.save();

      user.comments?.push(savedComment._id);
      trip.comments?.push(savedComment._id);

      await user.save();
      await trip.save();

      return savedComment;
    } catch (error) {
      throw new Error(`Error al crear comentario: ${(error as Error).message}`);
    }
  }

  async deleteComment(commentId: string): Promise<any> {
    try {
      const comment = await Comment.findByIdAndDelete(commentId);
      if (!comment) {
        throw new Error(`No existe el comentario buscado`);
      }
      return { msg: "Comentario eliminado con éxito!" };
    } catch (error) {
      throw new Error(
        `Error al eliminar comentario: ${(error as Error).message}`
      );
    }
  }

  async updateComment(commentId: string, commentData: commentsInterface): Promise<any> {
    try {
      const findComment = await Comment.findByIdAndUpdate(commentId, {
        text: commentData.text,
      });
      if (!findComment) {
        throw new Error(`Comentario no encontrado`);
      }

      return { msg: "Comentario actualizado" };
    } catch (error) {
      throw new Error(
        `Error al actualizar comentario: ${(error as Error).message}`
      );
    }
  }
}
export default new CommentsRepository();
