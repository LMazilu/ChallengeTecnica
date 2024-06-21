import {
  createPurchase,
  getAllPurchases,
  getPurchasesByUserId,
  getPurchaseById,
} from "../models/purchaseModel";
import { getVoucherById } from "../models/voucher";
import { getUserProfileById } from "./userService";


/**
 * Purchase a voucher for a user.
 *
 * @param {number} userId - The ID of the user.
 * @param {number} voucherId - The ID of the voucher.
 * @param {number} price - The price of the voucher.
 * @return {Promise<{id: number, userId: number, voucherId: number, price: number, purchaseDate: Date}>} - The purchase details.
 * @throws {Error} - If the voucher is not found, the voucher prices is not an array, or the price is not included in the voucher prices.
 * @throws {Error} - If the user is not found.
 */
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

/**
 * Retrieves the purchases made by a user.
 *
 * @param {number} userId - The ID of the user.
 * @return {Promise<Purchase[]>} - A promise that resolves to an array of Purchase objects representing the user's purchases.
 * @throws {Error} - If the user is not found.
 */
export const getUserPurchases = async (userId: number) => {
  const user = await getUserProfileById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return await getPurchasesByUserId(userId);
};


/**
 * Retrieves all purchases from the database.
 *
 * @return {Promise<Purchase[]>} A promise that resolves to an array of Purchase objects representing all purchases.
 */
export const getPurchases = async () => {
  return await getAllPurchases();
};

/**
 * Retrieves a purchase record by its ID from the database.
 *
 * @param {number} id - The ID of the purchase to retrieve.
 * @return {Promise<Purchase>} A promise that resolves with the purchase record matching the provided ID.
 */
export const getPurchaseByPurchaseId = async (id: number) => {
  return getPurchaseById(id);
};
