import { productService } from "../repositories/index.js";
import { generateProducts } from "../utils/fakerUtils.js";
import CustomError from "../services/errors/CustomError.js";
import { serverError } from "../services/errors/info.js";
import { addLogger } from "../logger.js";


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
        CustomError.createError({
            name: "Server error",
            cause: serverError(),
            message: "Internal server error",
            code: 0
        })
        req.logger.fatal(`${new Date().toDateString()} ${req.method} ${req.url}`)
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
        CustomError.createError({
            name: "Server error",
            cause: serverError(),
            message: "Internal server error",
            code: 0
        })
        req.logger.fatal(`${new Date().toDateString()} ${req.method} ${req.url}`)
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
        CustomError.createError({
            name: "Server error",
            cause: serverError(),
            message: "Internal server error",
            code: 0
        })
        req.logger.fatal(`${new Date().toDateString()} ${req.method} ${req.url}`)
    }
        
};

export const mockingProducts = (req, res) => {
    try {
        let mockProducts = [];
        for (let i = 0; i < 100; i++) {
            mockProducts.push(generateProducts())
        }

        res.send({
            status: 'success',
            payload: mockProducts 
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

export const loggerTest = (req, res) => {
    res.send("Probando loggerTest")
    req.logger.debug(`${new Date().toDateString()} ${req.method} ${req.url}`)
    req.logger.http(`${new Date().toDateString()} ${req.method} ${req.url}`)
    req.logger.info(`${new Date().toDateString()} ${req.method} ${req.url}`)
    req.logger.warning(`${new Date().toDateString()} ${req.method} ${req.url}`)
    req.logger.error(`${new Date().toDateString()} ${req.method} ${req.url}`)
    req.logger.fatal(`${new Date().toDateString()} ${req.method} ${req.url}`)
}


