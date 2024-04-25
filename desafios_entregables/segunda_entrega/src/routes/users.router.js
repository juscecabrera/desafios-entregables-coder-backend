import { Router } from "express";

import userModel from"../dao/models/userModel.js";

const router = Router();

router.post("/register", async (req,res) => {
    try {
        req.session.user = result;
        await userModel.create(req.body);
        res.redirect("/login")
    } catch(err) {
        res.redirect("/register");
    }
});


router.post("/login", async (req,res) => {
    try {
        req.session.failLogin = false;
        const result = await userModel.findOne({email: req.body.email}).lean();
        if (!result) {
            return res.redirect("/login");
        }
        if (req.body.password !== result.password) {
            
            return res.redirect("/login");
        } 
        
        delete result.password;
        
        req.session.user = result;
        console.log(req.session.user)
        return res.redirect("/");
    } catch (err) {
        return res.redirect("/login");
    }
});

export default router;