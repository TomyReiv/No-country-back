import express, { Request, Response, NextFunction } from "express";
import { CODE } from "../utils/constants";
import axios from 'axios';

const router = express.Router();

router.get("/country", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        
        const countries = response.data.map((country: any) => ({
            name: country.name.common,
            flag: country.flags.png
        }));
        
        res.json(countries);
    } catch (error) {
        next(error);
    }
});
export default router;