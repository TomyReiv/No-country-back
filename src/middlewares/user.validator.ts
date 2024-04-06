import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";


export const userValidator = [
  body("first_name").notEmpty().withMessage("El nombre es obligatorio"),
  body("last_name").notEmpty().withMessage("El apellido es obligatorio"),
  body("country").notEmpty().withMessage("El país es obligatorio"),
  body("email")
    .isEmail()
    .withMessage("Formato de correo invalido")
    .notEmpty()
    .withMessage("El email es obligatorio"),
  body("password")
    .notEmpty()
    .withMessage("El contraseña es obligatorio")
    .isLength({ min: 6 })
    .withMessage("Dabe tener al menos 6 caracteres")
    .matches(/[\W_]/)
    .withMessage("Debe contener al menos un caracter especial"),
  body("role").optional().isIn(["ADMIN", "USER"]).withMessage("Invalid role"),
];

export const handleUserValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
