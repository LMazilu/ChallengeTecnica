import { Router } from "express";
import {
  purchaseVoucherHandler,
  getUserPurchasesHandler,
} from "../controllers/purchaseController";
import {auth} from "../middlewares/auth";

const router = Router();

router.post("/", auth, purchaseVoucherHandler);
router.get("/", auth, getUserPurchasesHandler);

export default router;
