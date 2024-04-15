import CommentDto from "../dto/comments.dto";
import { commentsInterface } from "../interfaces/coments.interface";
import commentsService from "../services/comments.service";

class CommentController {
  async getAllComment(): Promise<CommentDto[]> {
    try {
      return await commentsService.getAllComment();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getCommentById(id: string): Promise<CommentDto> {
    try {
      return await commentsService.getCommentById(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async createComment(commentData: commentsInterface): Promise<any> {
    try {
      return await commentsService.createComment(commentData);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteComment(commendId: string): Promise<CommentDto> {
    try {
      return await commentsService.deleteComment(commendId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async updateComment(
    commentId: string,
    commentData: commentsInterface
  ): Promise<CommentDto> {
    try {
      return await commentsService.updateComment(commentId, commentData);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
export default new CommentController();
