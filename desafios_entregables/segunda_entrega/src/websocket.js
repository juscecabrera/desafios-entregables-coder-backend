import { ProductManager } from "./dao/ProductManagerFS.js";
// const ProductService = new ProductManager('products.json');
import { productManagerDB } from "./dao/productManagerDB.js";
const ProductService = new productManagerDB();
import { CartManagerDB } from "./dao/CartManagerDB.js";
const CartService = new CartManagerDB();


export default (io) => {
    io.on("connection", (socket) => {

        socket.on("createProduct", async (data) => {

            try {
                await ProductService.addProduct(data);
                const products = await ProductService.getProducts();
                socket.emit("publishProducts", products);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });

        socket.on("deleteProduct", async (data) => {
            try {
                const result = await ProductService.deleteProduct(data.pid);
                socket.emit("publishProducts", result);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        });

        socket.on("addProductCart", async (data) => {
            try {
                const result = await CartService.addProductCart(data.pid);
                socket.emit("publishProducts", result);
            } catch (error) {
                socket.emit("statusError", error.message);
            }
        } )
    });
}