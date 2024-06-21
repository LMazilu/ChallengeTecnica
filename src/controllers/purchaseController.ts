import { Request, Response } from "express";
import {
  purchaseVoucher,
  getUserPurchases,
  getPurchases,
  getPurchaseByPurchaseId,
} from "../services/purchaseService";

/**
 * Handles the purchase of a voucher for a user.
 *
 * @route POST /purchase
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the purchase is completed.
 */
export const purchaseVoucherHandler = async (req: Request, res: Response) => {
  try {
    const { userId, voucherId, price } = req.body;
    const purchase = await purchaseVoucher(userId, voucherId, price);
    res.status(201).json(purchase);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

/**
 * Handles the retrieval of purchases for a specific user.
 *
 * @route GET /purchases/user/
 * @param {Request} req - The request object containing the user ID.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the user's purchases.
 */
export const getUserPurchasesHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const purchases = await getUserPurchases(userId);
    res.status(200).json(purchases);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

/**
 * Retrieves all purchases and sends them as a JSON response.
 *
 * @route GET /purchases
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
export const getAllPurchasesHandler = async (req: Request, res: Response) => {
  try {
    const purchases = await getPurchases();
    res.status(200).json(purchases);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

/**
 * Handles the retrieval of a purchase by its ID and sends it as a JSON response.
 *
 * @route GET /purchases/:id
 * @param {Request} req - The request object containing the purchase ID.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
export const getPurchaseByPurchaseIdHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const purchase = await getPurchaseByPurchaseId(Number(id));
    res.status(200).json(purchase);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
