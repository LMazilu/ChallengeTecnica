import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getVouchers, purchaseVoucher } from "../controllers/voucherController";

const router = Router();

router.get("/", auth, getVouchers);
router.post("/purchase", auth, purchaseVoucher);

export default router;
