import { Router } from "express";
import { getProducts, getProductByID, addProduct, updateProduct, deleteProduct } from "../controllers/productController";

const router = Router();

router.get("/api/products", getProducts);
router.get("/api/products:pid", getProductByID);
router.post("/api/products", addProduct);
router.put("/api/products", updateProduct);
router.delete("/api/products", deleteProduct);

export default router;
