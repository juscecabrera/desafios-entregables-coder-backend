import Cart from "../dao/classes/cartDAO.js";
import { cartService } from "../repositories/index.js";
import { serverError } from "../services/errors/info.js";
import CustomError from "../services/errors/CustomError.js";

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
        CustomError.createError({
            name: "Server error",
            cause: serverError(),
            message: "Internal server error",
            code: 0
        })
        req.logger.fatal(`${new Date().toDateString()} ${req.method} ${req.url}`)
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
        CustomError.createError({
            name: "Server error",
            cause: serverError(),
            message: "Internal server error",
            code: 0
        })
        req.logger.fatal(`${new Date().toDateString()} ${req.method} ${req.url}`)
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
        CustomError.createError({
            name: "Server error",
            cause: serverError(),
            message: "Internal server error",
            code: 0
        })
        req.logger.fatal(`${new Date().toDateString()} ${req.method} ${req.url}`)
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
        CustomError.createError({
            name: "Server error",
            cause: serverError(),
            message: "Internal server error",
            code: 0
        })
        req.logger.fatal(`${new Date().toDateString()} ${req.method} ${req.url}`)
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
        CustomError.createError({
            name: "Server error",
            cause: serverError(),
            message: "Internal server error",
            code: 0
        })
        req.logger.fatal(`${new Date().toDateString()} ${req.method} ${req.url}`)
    }
}