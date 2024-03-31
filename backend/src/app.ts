import express, { Express } from 'express';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import http from "http";
import cors from "cors"
import { port } from "./utils/constants";
import cookieParser from 'cookie-parser';
import { init } from "./db/mongodb";

const app: Express = express();
app.use(express.json()); 
app.use(cookieParser());
app.use(cors())
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Travel app API',
            description: 'La descripción de la API de la app para viajeros',
            version: '1.0.0'
        },
    },
    apis: [path.join(process.cwd(), 'src', 'docs', 'swagger.yaml')]
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

async function startServer() {
    try {
        await init();
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
    }
}

startServer(); 


export default app;
