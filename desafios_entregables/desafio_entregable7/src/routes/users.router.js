import { Router } from "express";
import userModel from"../dao/models/userModel.js";
import { createHash, isValidPassword } from "../utils/functionsUtils.js";
import passport from "passport";
import local from "passport-local";
import CustomError from "../services/errors/CustomError.js";
import { userExistsError, registerError, userNonexistentError, serverError, wrongPassword, loginError } from "../services/errors/info.js";


const router = Router();
const localStrategy = local.Strategy;

router.post("/register", async (req,res) => {
    try {
        passport.authenticate("register", { failureRedirect: "/api/sessions/failRegister" })

        const { first_name, last_name, email, age, password, role } = req.body;

        const userExists = await userModel.findOne({ email })

        if (userExists) {
            CustomError.createError({
                name: "User creation error",
                cause: userExistsError(email),
                message: "User already exists",
                code: 2
            })
        }

        if(!email || !password) {
            CustomError.createError({
                name: "User creation error",
                cause: registerError(),
                message: "Error trying to create User",
                code: 3
            })
        }

        const newUser = new userModel({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role
        });

        await newUser.save();

        const userForSession = {
            _id: newUser._id,
            first_name,
            last_name,
            email,
            age,
            role
        };

        req.session.user = userForSession;
        console.log("Usuario registrado correctamente")
        res.redirect("/login")
    } catch(err) {
        CustomError.createError({
            name: "Server error",
            cause: serverError(),
            message: "Internal server error",
            code: 0
        })
        res.redirect("/register");
    }
});

router.get("/failRegister", (req, res) => {
    CustomError.createError({
        name: "User creation error",
        cause: registerError(),
        message: "Error trying to create User",
        code: 1
    })
})


router.post("/login", async (req,res) => {
    try {
        passport.authenticate("login", { failureRedirect: "/api/sessions/failLogin" })

        const { first_name, last_name, email, age, password } = req.body;

        const result = await userModel.findOne({ email }).lean();

        if (!result) {
            CustomError.createError({
                name: "User login error",
                cause: userNonexistentError(),
                message: "User does not exists",
                code: 1
            })
            return res.redirect("/login");
        }
        if (!isValidPassword(result, password)) {
            CustomError.createError({
                name: "User login error",
                cause: wrongPassword(),
                message: "Wrong password",
                code: 1
            })
            return res.redirect("/login");
        } 
        
        const userForSession = {
            _id: result._id,
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            age: result.age,
            role: result.role
        };

        req.session.user = userForSession;
        console.log("Sesión iniciada correctamente")
        if (result.role === "admin") {
            res.redirect("/private");
        } else {
            res.redirect("/current");
        }
        
    } catch(err) {
        CustomError.createError({
            name: "Server error",
            cause: serverError(),
            message: "Internal server error",
            code: 0
        })
        res.redirect("/login");
    }
});

router.get("/failLogin", (req, res) => {
    CustomError.createError({
        name: "Login fail",
        cause: loginError(),
        message: "Login fail",
        code: 1
    })
})

router.get("/github", passport.authenticate('github', {scope: ['user:email']}), (req, res) => {
    res.send({
        status: 'success',
        message: 'Success'
    });
});

router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});


export default router;