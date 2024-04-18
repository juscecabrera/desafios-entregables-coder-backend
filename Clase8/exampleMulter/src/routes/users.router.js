import {Router} from "express";
import { uploader } from "../utils.js"

const router = Router();

const users = [];

router.get("/", (req, res) => {
    res.send(users);
});

router.post("/", uploader.single("profile"), (req, res) => {

    if (!req.file) {
        return res.status(400).send({error: "Se necesita cargar una imagen"});
    }

    const { name, course, email } = req.body;

    if(!name || !email || !course) return res.status(400).send({error: "Debe ingresar todos los campos válidos"});

    const profile = req.file.path;

    users.push({ name, course, email, profile });

    res.status(201).send({message: "Usuario creado correctamente!"});
});

export default router;