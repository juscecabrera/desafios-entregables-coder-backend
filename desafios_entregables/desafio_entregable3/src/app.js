import express from "express";
import { ProductManager } from "./desafio_entregable3.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PM = new ProductManager("./Products.json")

app.get("/api/products", async (req, res) => {
    res.send(await PM.getProducts());
});

app.get("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid;
    res.send(await PM.getProductById(pid));
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});