import mongoose from "mongoose";
import { db } from "../utils/constants";

export const init = async () => {
    try {
        const URL: string = db; 
        await mongoose.connect(URL);
        console.log('Conectado a la base de datos correctamente');
    } catch (error) {
        console.error(error);
    }
};
