import { Request, Response } from "express";
import { purchaseVoucher, getUserPurchases, getPurchases, getPurchaseByPurchaseId } from "../services/purchaseService";

export const purchaseVoucherHandler = async (req: Request, res: Response) => {
  try {
    const {userId, voucherId, price} = req.body;
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
}

export const getPurchaseByPurchaseIdHandler = async (req: Request, res: Response) => {
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
}