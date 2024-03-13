import express from "express";
import { ProductManager } from "./desafio_entregable3.js";
import fs from "fs";


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PM = new ProductManager("./Products.json")

app.get("/api/products", (req, res) => {
    const limit = req.query.limit;

    if (!limit){
        return res.send(PM.getProducts());
    } 

    let productsFile = JSON.parse(fs.readFileSync("./Products.json", "utf8"))

    let productsLimited = []

    function productsLimit (){
        for (let i = 0; i < limit; i++) {
            productsLimited.push(productsFile[i])
        }
    }
    productsLimit();
    res.send({productsLimited})
});

app.get("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid;
    res.send(await PM.getProductById(pid))
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});