import {
  createPurchase,
  getAllPurchases,
  getPurchasesByUserId,
  getPurchaseById,
} from "../models/purchaseModel";
import { getVoucherById } from "../models/voucher";
import { getUserProfileById } from "./userService";

export const purchaseVoucher = async (
  userId: number,
  voucherId: number,
  price: number
) => {
  const voucher = await getVoucherById(voucherId);
  if (!voucher) {
    throw new Error("Voucher not found");
  }

  if (!Array.isArray(voucher.prices)) {
    logging.log(voucher.prices);
    throw new Error("Voucher prices is not an array");
  }

  if ((!voucher.prices.some((p) => p === price))) {
    throw new Error("Invalid price, price is not included in voucher prices");
  }

  const user = await getUserProfileById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const purchaseId = await createPurchase(userId, voucherId, price);
  return { id: purchaseId, userId, voucherId, price, purchaseDate: new Date() };
};

export const getUserPurchases = async (userId: number) => {
  const user = await getUserProfileById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return await getPurchasesByUserId(userId);
};

export const getPurchases = async () => {
  return await getAllPurchases();
};

export const getPurchaseByPurchaseId = async (id: number) => {
  return getPurchaseById(id);
};
