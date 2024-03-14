import express from "express";
import { ProductManager } from "./ProductManager.js";
import fs from "fs";
import { CartManager } from "./CartManager.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PM = new ProductManager("./Products.json");
const CM = new CartManager("./Cart.json");


//Productos
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

app.post("/api/products", async (req, res) => {
    const response = await PM.addProduct(req.body)
    res.status(201).send(response)
});

app.put("/api/products/:pid" , async (req, res) => {
    const pid = req.params.pid;
    res.send(await PM.updateProduct(pid, req.body))
});

app.delete("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid;
    res.send(await PM.deleteProduct(pid));
});

//Carrito

app.post("/api/cart", async (req, res) => {
    const response = await CM.createCart(req.body)
    res.status(201).send(response)
});

app.post("/api/cart/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    res.send(await CM.addProductCart(pid, cid))
});

app.get("/api/cart/:cid", async (req, res) => {
    const cid = req.params.cid;
    res.send(await CM.getProductById(cid))
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});