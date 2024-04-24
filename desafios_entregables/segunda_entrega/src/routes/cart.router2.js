import { Router } from "express";
import { CartManagerDB } from "../dao/CartManagerDB.js";

const router = Router();

const CM = new CartManagerDB();

//LISTO
router.post("/api/cart", async (req, res) => {
    //Este tiene que crear carritos
    const response = await CM.createCart([])
    res.status(201).send(response)
});

//LISTO
router.post("/api/cart/:cid/product/:pid", async (req, res) => {
    //Este tiene que agregar productos a un carrito
    const cid = req.params.cid;
    const pid = req.params.pid;
    let { quantity } = req.body;
    res.send(await CM.addProductCart(cid, pid, quantity))
});

//LISTO
router.get("/api/cart/:cid", async (req, res) => {
    //Este tiene que retornar un carrito por su id
    const cid = req.params.cid;
    res.send(await CM.getCartByID(cid))
});

//Esto es lo nuevo que agregue

//LISTO
router.delete ("/api/cart/:cid", async (req, res) => {
    //Elimina todos los productos del carrito :cid
    //No eliminar el carrito, solo vaciarlo
    try {
        const cid = req.params.cid
        const result = await CM.emptyCart(cid)
        res.send({
            status: "success",
            payload: result
        }); 
    } catch (err) {
        res.status(400).send({
            status: "error",
            message: err.message
        })
    }
});

//LISTO
router.delete ("/api/cart/:cid/product/:pid", async (req, res) => {
    //deberá eliminar del carrito el producto seleccionado.
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const result = await CM.deleteProductInCart(cid, pid)
        res.send({
            status: "success",
            payload: result
        }); 
    } catch (err) {
        res.status(400).send({
            status: "error",
            message: err.message
        })
    }
});

//To do
router.put ("/api/cart/:cid", async (req, res) => {
    //actualizar el carrito con un arreglo de productos con el formato especificado arriba.
    //Recibe todo el array con los productos y cantidades nuevas desde el body
    try {
        const cid = req.params.cid;
        let {product} = req.body;
        let {quantity} = req.body;
        const result = await CM.updateCart(cid, product, quantity)
        res.send({
            status: "success",
            payload: result
        }); 
    } catch (err) {
        res.status(400).send({
            status: "error",
            message: err.message
        })
    }
});

//FUNCIONA
router.put ("/api/cart/:cid/product/:pid", async (req, res) => {
    //Actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
    //Actualiza SOLO la cantidad, mas no el producto
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        let {quantity} = req.body;
        const result = await CM.updateQuantity(cid, pid, quantity);
        res.send({
            status: "success",
            payload: result
        }); 
    } catch (err) {
        res.status(400).send({
            status: "error",
            message: err.message
        })
    }
});




export default router;