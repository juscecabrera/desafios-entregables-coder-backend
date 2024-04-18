import {Router} from "express";

const router = Router();

const pets = [];

router.get("/", (req, res) => {
    res.send(pets);
});

router.post("/", (req, res) => {
    const { name, species } = req.body;

    if(!name || !species) return res.status(400).send({error: "Debe ingresar todos los campos válidos"});

    pets.push({ name, species });

    res.status(201).send({message: "Mascota creada correctamente!"});
});

export default router;