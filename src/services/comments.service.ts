import CommentDto from "../dto/comments.dto";
import { commentsInterface } from "../interfaces/coments.interface";
import CommentsRepository from "../repositories/comments.repository";

class CommentService {
  async getAllComment(): Promise<CommentDto[]> {
    try {
      return await CommentsRepository.getAllComments();
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
      return await CommentsRepository.createComment(commentData);
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
