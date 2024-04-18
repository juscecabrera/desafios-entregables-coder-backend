import {Router} from "express";

const router = Router();

const users = [];

router.get("/", (req, res) => {
    res.send(users);
});

router.post("/", (req, res) => {
    const { name, course, email } = req.body;

    if(!name || !email || !course) return res.status(400).send({error: "Debe ingresar todos los campos válidos"});

    users.push({ name, course, email });

    res.status(201).send({message: "Usuario creado correctamente!"});
});

export default router;