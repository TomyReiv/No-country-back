"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
/* import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path"; */
const http_1 = __importDefault(require("http"));
/* import { port } from "../src/utilitis/constants"; */
/* import { init } from "./db/mongodb"; */
const app = (0, express_1.default)();
app.use(express_1.default.json());
/* const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Travel app API',
            description: 'La descripción de la API de la app para viajeros',
            version: '1.0.0'
        },
    },
    apis: [path.join(process.cwd(), 'docs', '**', '*.yaml')]
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); */
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /* await init(); */
            const port = 3000;
            const server = http_1.default.createServer(app);
            server.listen(port, () => {
                console.log(`Servidor corriendo en http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error("Error al iniciar el servidor:", error);
            process.exit(1);
        }
    });
}
startServer();
exports.default = app;
