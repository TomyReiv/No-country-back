import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const createCommentValidator = [
  body("userId").notEmpty().withMessage("User is required"),
  body("text")
    .notEmpty()
    .withMessage("Text is required")
    .isLength({ min: 10 })
    .withMessage("Text should beat least 10 characters"),
  body('tripId').notEmpty().withMessage('Place is required')
];
export const updateCommentValidator = [
  body("text")
    .notEmpty()
    .withMessage("Text is required")
    .isLength({ min: 10 })
    .withMessage("Text should beat least 10 characters")
];

export const handleCommentsValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
