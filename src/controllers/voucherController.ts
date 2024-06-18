import { Request, Response } from "express";
import { db } from "../config/db";

export const getVouchers = async (req: Request, res: Response) => {
  const [vouchers] = await db.execute("SELECT * FROM vouchers");
  res.json(vouchers);
};

export const purchaseVoucher = async (req: Request, res: Response) => {
  const { user_id, voucher_id } = req.body;
  await db.execute(
    "INSERT INTO purchases (user_id, voucher_id) VALUES (?, ?)",
    [user_id, voucher_id]
  );
  res.status(201).send("Voucher purchased");
};
