// import { ProductManager } from "./controllers/ProductManagerFS.js";
// const ProductService = new ProductManager('products.json');

// import { productManagerDB } from "./controllers/productManagerDB.js";
// const ProductService = new productManagerDB();
// import { CartManagerDB } from "./controllers/CartManagerDB.js";
// const CartService = new CartManagerDB();

import {getProducts, addProduct, deleteProduct } from "./controllers/productController.js"
import { addProductCart } from "./controllers/cartController.js"


export default (io) => {
    io.on("connection", (socket) => {
        socket.on("createProduct", async (data) => {
            try {
                await addProduct(data);
                const products = await getProducts();
                socket.emit("publishProducts", products);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });

        socket.on("deleteProduct", async (pid) => {
            try {
                const result = await deleteProduct(pid);
                socket.emit("publishProducts", result);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });

        socket.on("addProductCart", async (data) => {
            try {
                const result = await addProductCart(data.pid);
                socket.emit("publishProducts", result);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        } )
    });
}

