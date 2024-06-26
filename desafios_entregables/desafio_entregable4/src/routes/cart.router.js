import { Router } from "express";
import { CartManager } from "../dao/CartManagerFS.js";
import fs from "fs";

const router = Router();

const CM = new CartManager("../src/Cart.json");

router.post("/api/cart", async (req, res) => {
    const response = await CM.createCart([])
    res.status(201).send(response)
});

router.post("/api/cart/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    let {quantity} = req.body;
    res.send(await CM.addProductCart(pid, cid, quantity))
});

router.get("/api/cart/:cid", async (req, res) => {
    const cid = req.params.cid;
    res.send(await CM.getCartById(cid))
});


export default router;