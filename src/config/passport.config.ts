import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Request } from 'express';
import userController from "../controllers/user.controller";
import userModel from "../models/user.model";
import { isValidPassword } from "../utils/utility";


export const init = () => {
    passport.use(
        "register",
        new LocalStrategy({ usernameField: "email", passReqToCallback: true },
            async (req: Request, email, password, done) => {
                try {
                    const newUser = await userController.createUser(req.body);
                    done(null, newUser);
                } catch (error) {
                    done(
                        new Error(`Ocurrio un error durante la autenticacion ${(error as Error).message}`)
                    );
                }
            })
    )

    passport.use(
        "login",
        new LocalStrategy({ usernameField: "email", passReqToCallback: true },
            async (req: Request, email, password, done) => {
                try {
                    const { email } = req.body;
                    
                    const user = await userModel.findOne({ email });
                    
                    if (!user) {
                        return done(new Error("Usuario o contraseña invalidos"));
                    }
                    const passwordMatch = isValidPassword(password, user);

                    if (!passwordMatch) {
                        return done(new Error("Usuario o contraseña invalidos"));
                    }

                    done(null, user);
                } catch (error) {
                    done(
                        new Error(`Ocurrio un error durante la autenticacion ${(error as Error).message}`)
                    );
                }
            })
    )

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser(async (uid, done) => {
        try {
            const user = await userModel.findById(uid);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
}