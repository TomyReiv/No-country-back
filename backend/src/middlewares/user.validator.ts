import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";


export const userValidator = [
  body("first_name").notEmpty().withMessage("First name is required"),
  body("last_name").notEmpty().withMessage("Last name is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters")
    .matches(/[\W_]/)
    .withMessage("Password should contain at least one special character"),
  body("role").optional().isIn(["ADMIN", "USER"]).withMessage("Invalid role"),
];

export const handleUserValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
