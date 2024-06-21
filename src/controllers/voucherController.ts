import { getUserProfileById } from "../services/userService";
import {
  createVoucherWithDetails,
  deleteVoucherById,
  getAllvouchersWithDetails,
  getVoucherByIdWithDetails,
} from "../services/voucherService";
import { Request, Response } from "express";

/**
 * Handles the creation of a voucher.
 *
 * @route POST /vouchers
 * @param {Request} req - The request object containing the voucher details.
 * @param {Response} res - The response object to send the created voucher or error message.
 * @return {Promise<void>} - A promise that resolves when the voucher is created or rejects with an error.
 */
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

/**
 * Retrieves all vouchers with details and sends them as a JSON response.
 *
 * @route GET /vouchers
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
export const getAllvouchersHandler = async (req: Request, res: Response) => {
  try {
    const vouchers = await getAllvouchersWithDetails();
    res.status(200).json(vouchers);
  } catch (error: Error | any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Retrieves a voucher by its ID and sends it as a JSON response.
 *
 * @route GET /vouchers/:id
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
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

/**
 * Handles the deletion of a voucher by its ID.
 *
 * @route DELETE /vouchers/:id
 * @param {Request} req - The request object containing the voucher ID.
 * @param {Response} res - The response object to send the result.
 * @return {Promise<void>} A promise that resolves when the deletion is completed.
 */
export const deleteVoucherHandler = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await deleteVoucherById(id);
        res.status(204).end();
    } catch (error: Error | any) {
        res.status(400).json({ error: error.message });
    }
};