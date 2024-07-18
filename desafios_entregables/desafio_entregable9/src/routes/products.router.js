import { Router } from "express";
import { getProducts, getProductByID, addProduct, updateProduct, deleteProduct, mockingProducts, loggerTest } from "../controllers/productController.js";

import { authorization } from "../middlewares/authorization.js"

const router = Router();

router.get("/loggerTest", loggerTest)
router.get("/mockingproducts", mockingProducts)
router.get("/api/products", getProducts);
router.get("/api/products/:pid", getProductByID);
router.post("/api/products", addProduct);
router.put("/api/products", updateProduct);
router.delete("/api/products", deleteProduct);

export default router;
