import {
  createPurchase,
  getPurchasesByUserId,
  Purchase,
} from "../models/purchaseModel";
import { getVoucherById } from "../models/voucher";
import { getUserProfileById } from "./userService";

export const purchaseVoucher = async (
  userId: number,
  voucherId: number,
  price: number
): Promise<Purchase> => {
  const voucher = await getVoucherById(voucherId);
  if (!voucher) {
    throw new Error("Voucher not found");
  }

  if (!voucher.prices.includes(price)) {
    throw new Error("Invalid price");
  }

  const user = await getUserProfileById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const purchaseId = await createPurchase(userId, voucherId, price);
  return { id: purchaseId, userId, voucherId, price, purchaseDate: new Date() };
};

export const getUserPurchases = async (userId: number): Promise<Purchase[]> => {
    const user = await getUserProfileById(userId);
    if (!user) {
      throw new Error("User not found");
    }
  return await getPurchasesByUserId(userId);
};
