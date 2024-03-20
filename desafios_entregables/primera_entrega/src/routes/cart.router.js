import { Router } from "express";
import { CartManager } from "../CartManager.js";
import fs from "fs";

const router = Router();

const CM = new CartManager("./Cart.json");

router.post("/api/cart", async (req, res) => {
    const response = await CM.createCart(req.body)
    res.status(201).send(response)
});

router.post("/api/cart/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    res.send(await CM.addProductCart(pid, cid))
});

router.get("/api/cart/:cid", async (req, res) => {
    const cid = req.params.cid;
    res.send(await CM.getProductById(cid))
});


export default router;