import { Router } from 'express';
import fs from "fs";
import { ProductManager } from '../dao/ProductManagerFS.js';
// import { productManagerDB } from '../dao/productManagerDB.js';

const router = Router();
const ProductService = new ProductManager('products.json');
// const ProductService = new productManagerDB();


const productsFile = fs.readFileSync("./src/Products.json", "utf8")

router.get("/", (req, res) => {
    res.render(
        "home",
        {
            title: "Lista de productos",
            products: ProductService.getProducts()
            // listaProductos: productsFile
        }
    )
});

router.get("/realtimeproducts", (req, res) => {
    res.render(
        "realTimeProducts",
        {
            title: "Productos en tiempo real",
            products: ProductService.getProducts()
            // listaTiempoReal: productsFile
        }
    )
});


export default router;





