import { Router } from "express";

import { getBusiness, getBusinessById, createBusiness, addProduct } from "../controllers/businessController.js";

const router = Router();

router.get("/", getBusiness);
router.post("/", createBusiness);
router.get("/:bid", getBusinessById);
router.put("/:bid", addProduct)

export default router