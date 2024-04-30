import { Router } from "express";

import userModel from"../dao/models/userModel.js";

const router = Router();

router.post("/register", async (req,res) => {
    try {
        //Este es el cambio que me pidio Lucia
        const { first_name, last_name, email, age, password } = req.body;

        const userExists = await userModel.findOne({ email })

        if (userExists) {
            return res.status(400).send("El usuario ya existe")
        }

        const newUser = new userModel({
            first_name,
            last_name,
            email,
            age,
            password
        });

        await newUser.save();

        const userForSession = {
            _id: newUser._id,
            first_name,
            last_name,
            email,
            age,
        };

        req.session.user = userForSession;
        console.log("Usuario registrado correctamente")
        res.redirect("/login")
    } catch(err) {
        console.error(err)
        res.status(500).send("Error del servidor")
        res.redirect("/register");
    }
});


router.post("/login", async (req,res) => {
    try {
        
        const result = await userModel.findOne({email: req.body.email}).lean();

        if (!result) {
            console.log("El usuario no existe")
            return res.redirect("/login");
        }
        if (req.body.password !== result.password) {
            console.log("Contraseña incorrecta")
            return res.redirect("/login");
        } 
        
        //Hice esta modificacion para intentar mandar el req.session.user sin contraseña
        
        
        const userForSession = {
            _id: result._id,
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            age: result.age,
        };

        req.session.user = userForSession;
        //Este console.log si funciona, pero el de views.router2 no, no lo esta mandando
        console.log(req.session.user)
        res.redirect("/");
    } catch(err) {
        console.error(err)
        res.redirect("/login");
    }
});

export default router;