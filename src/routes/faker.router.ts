import express, { Request, Response, NextFunction } from "express";
import { generatePlaces } from "../utils/fakerGenerate"
import { CODE } from "../utils/constants";

const router = express.Router();

router.get("/mockingproducts", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const places = [];
        for (let index = 0; index < 20; index++) {
          places.push(generatePlaces());
        }
        res.status(CODE.OK).json(places);
    } catch (error) {
        next(error);
    }
  });

  export default router;