import express, { Request, Response } from "express";
import CommentsController from "../controllers/comments.controller";
import {
  createCommentValidator,
  handleCommentsValidationErrors,
  updateCommentValidator,
} from "../middlewares/comments.validator";
import { commentsInterface } from "../interfaces/coments.interface";

const router = express.Router();

router.get("/comments", async (req: Request, res: Response) => {
  try {
    const comments = await CommentsController.getAllComment();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.get("/comment/:id", async (req: Request, res: Response) => {
  try {
    const commentId: string = req.params.id;
    const comment = await CommentsController.getCommentById(commentId);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.post(
  "/comment",
  createCommentValidator,
  handleCommentsValidationErrors,
  async (req: Request, res: Response) => {
    const commentData: commentsInterface = req.body;
    try {
      const createComment = await CommentsController.createComment(commentData);
      return res.status(200).json(createComment);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

router.put(
  "/comment/:id",
  updateCommentValidator,
  handleCommentsValidationErrors,
  async (req: Request, res: Response) => {
    const commentId: string = req.params.id;
    const commentData: commentsInterface = req.body;
    try {
      const updateComment = await CommentsController.updateComment(
        commentId,
        commentData
      );
      res.status(200).json(updateComment);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

router.delete("/comment/:id", async (req: Request, res: Response) => {
  try {
    const commentId: string = req.params.id;
    const deleteComment = await CommentsController.deleteComment(commentId);
    res.status(200).json(deleteComment);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});
export default router;
