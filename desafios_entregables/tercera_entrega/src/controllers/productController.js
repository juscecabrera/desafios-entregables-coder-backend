import { productService } from "../repositories/index.js";


export const getProducts = async (req, res) => {
    const result = await productService.getProducts();
    res.send({
        status: "success",
        payload: result
    })
};


export const getProductByID = async (req, res) => {
    const pid = req.params.pid;
    res.send(await productService.getProductByID(pid))
};


export const addProduct = async (req, res) => {
    try {
        const result = await productService.addProduct(req.body);
        res.send({
            status: "success",
            payload: result
        });        
    }catch (err){
        res.status(400).send({
            status: "error",
            message: err.message
        })
    }
    
};


export const updateProduct = async (req, res) => {
    try {
        const pid = req.params.pid;   
        const result = await productService.updateProduct(pid, req.body)
        res.send({
            status: 'success',
            payload: result
        })
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err.message
        });
    }
    
};


export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const result = await productService.deleteProduct(pid)
        res.send({
            status: 'success',
            payload: result 
        });
    } catch (err) {
        res.status(400).send({
            status: 'error',
            message: err.message
        });
    }
        
};


