import { Router } from 'express';
// import fs from "fs";
// import { ProductManager } from '../dao/ProductManagerFS.js';
import { productManagerDB } from '../dao/productManagerDB.js';

const router = Router();
// const ProductService = new ProductManager('products.json');
const PM = new productManagerDB();


// const productsFile = fs.readFileSync("./src/Products.json", "utf8")

router.get("/", async (req, res) => {
    res.render(
        "home",
        {
            title: "Lista de productos",
            products: await PM.getProducts()
            // listaProductos: productsFile
        }
    )
});

router.get("/realtimeproducts", async (req, res) => {
    res.render(
        "realTimeProducts",
        {
            title: "Productos en tiempo real",
            products: await PM.getProducts()
            // listaTiempoReal: productsFile
        }
    )
});


export default router;





