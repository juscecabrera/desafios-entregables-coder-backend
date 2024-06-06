import Cart from "../dao/classes/cartDAO.js";
import { cartService } from "../repositories/index.js";

// const cartService = new Cart();

export const createCart = async (req, res) => {
    const response = await cartService.createCart([])
    res.status(201).send(response)
}

export const addProductCart = async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    let { quantity } = req.body;
    res.send(await cartService.addProductCart(cid, pid, quantity))
};

export const getCartByID = async (req, res) => {
    const cid = req.params.cid;
    res.send(await cartService.getCartByID(cid))
};

export const emptyCart = async (req, res) => {
    try {
        const cid = req.params.cid
        const result = await cartService.emptyCart(cid)
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
};

export const deleteProductInCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const result = await cartService.deleteProductInCart(cid, pid)
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
};


export const updateCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        let {product} = req.body;
        let {quantity} = req.body;
        const result = await cartService.updateCart(cid, product, quantity)
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
};

export const updateQuantity = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        let {quantity} = req.body;
        const result = await cartService.updateQuantity(cid, pid, quantity);
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
};

export const purchaseCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        const result = await cartService.purchaseCart(cid);
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
}