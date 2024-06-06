import Cart from "../dao/classes/cartDAO.js";
import Product from "../dao/classes/productDAO.js";
import CartRepository from "./cartRepository.js";
import ProductRepository from "./productRepository.js";

export const cartService = new CartRepository(new Cart());
export const productService = new ProductRepository(new Product());


