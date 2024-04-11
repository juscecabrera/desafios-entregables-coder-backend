import { Router } from "express";
// import { ProductManager } from "../dao/ProductManagerFS.js";
import { productManagerDB } from "../dao/productManagerDB.js";
import fs from "fs";

const router = Router();

// const PM = new ProductManager("./Products.json");
const PM = new productManagerDB();

router.get("/api/products", async (req, res) => {
    const result = await PM.getProducts();
    res.send({
        status: "success",
        payload: result
    })
});


router.get("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid;
    res.send(await PM.getProductByID(pid))
});


router.post("/api/products", async (req, res) => {
    try {
        const result = await PM.addProduct(req.body);
        res.send({
            status: "success",
            payload: result
        });        
    }catch (err){
        res.status(400).send({
            status: "error",
            message: error.message
        })
    }
    
});


router.put("/api/products/:pid" , async (req, res) => {
    try {
        const pid = req.params.pid;   
        const result = await PM.updateProduct(pid, req.body)
        res.send({
            status: 'success',
            payload: result
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
    
});


router.delete("/api/products/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const result = await PM.deleteProduct(pid)
        res.send({
            status: 'success',
            payload: result 
        });
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
        
});


export default router;