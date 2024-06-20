import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  createVoucherHandler,
  deleteVoucherHandler,
  getAllvouchersHandler,
  getVoucherByIdHandler,
} from "../controllers/voucherController";

const router = Router();

router.get("/", auth, getAllvouchersHandler);
router.get("/:id", auth, getVoucherByIdHandler);
router.post("/", auth, createVoucherHandler);
router.delete("/:id", auth, deleteVoucherHandler);

export default router;
