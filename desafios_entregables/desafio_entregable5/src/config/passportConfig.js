import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../dao/models/userModel.js";
import { createHash, isValidPassword } from "../functionsUtils.js";

/*
Mandé el App ID, el Client ID y el Client Secret por el chat de CoderHouse. Así los profes pueden corregir mi trabajo con las credenciales sin que sean públicas. 
*/

const localStrategy = local.Strategy;
const initializatePassport = () => {

    const CLIENT_ID = "";
    const SECRET_ID = "";

    passport.use("github", new GitHubStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret: SECRET_ID,
            callbackURL: "http://localhost:8080/api/sessions/githubcallback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                
                let user = await userModel.findOne({email: profile._json.login})
                if(!user) {
                    let newUser = {
                        first_name: profile._json.name,
                        email: profile._json.login,
                        password: ""
                    }
                    let result = await userModel.create(newUser);
                    done(null, result)
                } else {
                    done(null, user)
                }
            } catch(err) {
                return done(err)
            }
        }
    ))

    passport.use("register", new localStrategy(
        {
            passReqToCallback: true,
            usernameField: "email"
        },
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;

            try {
                let user = await userModel.findOne({email: username})
                if (user) {
                    console.log("El usuario ya existe");
                    return done(null, false);
                }

                const newUser = { first_name, last_name, email, age, password: createHash(password) }
                const result = await userModel.create(newUser);

                return done(null, result)
            } catch (err) {
                return done(err.message);
            }
        }
    ))

    passport.use("login", new localStrategy(
        {
            usernameField: "email"
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                if(!user) {
                    const errorMessage = "No existe el usuario";
                    console.log(errorMessage);
                    return done(errorMessage)
                }

                if(!isValidPassword(user, password)) {
                    return done("Usuario o contraseña incorrecto");
                }

                return done(null, user);
            } catch(err) {
                console.log(err.message)
                return done(err.message)
            }
        }
    ))

    passport.serializeUser((user, done) => done(null, user._id));

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    })
}

export default initializatePassport;