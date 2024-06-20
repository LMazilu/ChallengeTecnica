import { Router } from "express";
import {
  purchaseVoucherHandler,
  getUserPurchasesHandler,
  getAllPurchasesHandler,
  getPurchaseByPurchaseIdHandler,
} from "../controllers/purchaseController";
import {auth} from "../middlewares/auth";

const router = Router();

router.post("/", auth, purchaseVoucherHandler);
router.get("/", auth, getAllPurchasesHandler);
router.get("/:id", auth, getPurchaseByPurchaseIdHandler);
router.get("/user/:id", auth, getUserPurchasesHandler);

export default router;
