import { Router } from "express";
import { createCart, addProductCart, getCartByID, emptyCart, deleteProductInCart, updateCart, updateQuantity, purchaseCart } from "../controllers/cartController.js";

const router = Router();

router.post("/api/cart", createCart);
router.post("/api/cart/:cid/product/:pid", addProductCart);
router.post("/api/cart/:cid/purchase", purchaseCart);
router.get("/api/cart/:cid", getCartByID);
router.delete ("/api/cart/:cid", emptyCart);
router.delete ("/api/cart/:cid/product/:pid", deleteProductInCart);
router.put ("/api/cart/:cid", updateCart);
router.put ("/api/cart/:cid/product/:pid", updateQuantity);


export default router;