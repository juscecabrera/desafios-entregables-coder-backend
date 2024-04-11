import { Router } from "express";
import { ProductManager } from "../dao/ProductManagerFS.js";
import fs from "fs";

const router = Router();

const PM = new ProductManager("./Products.json");

router.get("/api/products", (req, res) => {
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


router.get("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid;
    res.send(await PM.getProductById(pid))
});


router.post("/api/products", async (req, res) => {
    const response = await PM.addProduct(req.body)
    res.status(201).send(response)
});


router.put("/api/products/:pid" , async (req, res) => {
    const pid = req.params.pid;
    res.send(await PM.updateProduct(pid, req.body))
});


router.delete("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid;
    res.send(await PM.deleteProduct(pid));
});


export default router;