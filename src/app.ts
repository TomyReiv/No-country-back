import express, { Express } from 'express';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import http from "http";
import cors from "cors"
import { port, secret } from "./utils/constants";
import cookieParser from 'cookie-parser';
import { init } from "./db/mongodb";
import userRouter from './routes/user.router';
import placeRouter from './routes/place.router'
import commentsRouter from './routes/comments.router';
import countryRouter from "./routes/country.router";

import passport from "passport";
import { init as initPassport } from "./config/passport.config";
import session from 'express-session';
import emailRouter from './routes/email.router';
import { errorHandler } from './middlewares/error.middleware';
import tripRouter from './routes/trip.router';

const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
const swaggerOptions = {
	definition: {
		openapi: '3.0.1',
		info: {
			title: 'Travel app API',
			description: 'La descripción de la API de la app para viajeros',
			version: '1.0.0'
		}
	},
	apis: [path.join(process.cwd(), 'src', 'docs', 'swagger.yaml')]
}

app.use(
	session({
		secret: secret,
		resave: false,
		saveUninitialized: false
	})
)

startServer()
initPassport()
app.use(passport.initialize())
app.use(passport.session())

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', userRouter, emailRouter, tripRouter, commentsRouter, countryRouter);
app.use('/api/places', placeRouter)

async function startServer() {
	try {
		await init()
		const server = http.createServer(app)
		server.listen(port, () => {
			console.log(`Servidor corriendo en http://localhost:${port}`)
		})
	} catch (error) {
		console.error('Error al iniciar el servidor:', error)
		process.exit(1)
	}
}
app.use(errorHandler);
export default app;

