import { getUserProfileById } from "../services/userService";
import {
  createVoucherWithDetails,
  deleteVoucherById,
  getAllvouchersWithDetails,
  getVoucherByIdWithDetails,
} from "../services/voucherService";
import { Request, Response } from "express";

export const createVoucherHandler = async (req: Request, res: Response) => {
  try {
    const { name, description, prices, assets } = req.body.voucher;
    const voucher = await createVoucherWithDetails(
      name,
      description,
      prices,
      assets
    );
    res.status(201).json(voucher);
  } catch (error: Error | any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllvouchersHandler = async (req: Request, res: Response) => {
  try {
    const vouchers = await getAllvouchersWithDetails();
    res.status(200).json(vouchers);
  } catch (error: Error | any) {
    res.status(400).json({ error: error.message });
  }
};

export const getVoucherByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const voucher = await getVoucherByIdWithDetails(id);
    if (!voucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    res.status(200).json(voucher);
  } catch (error: Error | any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteVoucherHandler = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await deleteVoucherById(id);
        res.status(204).end();
    } catch (error: Error | any) {
        res.status(400).json({ error: error.message });
    }
};