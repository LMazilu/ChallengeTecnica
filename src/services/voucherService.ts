import {
  Voucher,
  createVoucher,
  getAllvouchers,
  getVoucherById,
  deleteVoucher,
} from "../models/voucher";
import { createVoucherAssets, getVoucherAssets } from "../models/voucherAsset";
import { createVoucherPrices, getVoucherPrices } from "../models/voucherPrice";

/**
 * Creates a voucher with the given details.
 *
 * @param {string} name - The name of the voucher.
 * @param {string} description - The description of the voucher.
 * @param {number[]} prices - The prices of the voucher.
 * @param {string[]} assets - The assets of the voucher.
 * @return {Promise<{ voucherId: number, name: string, description: string, prices: number[], assets: string[] }>} - A promise that resolves to an object containing the voucher ID, name, description, prices, and assets.
 */
export const createVoucherWithDetails = async (
  name: string,
  description: string,
  prices: number[],
  assets: string[]
) => {
  const voucherId = await createVoucher(name, description);
  await createVoucherPrices(voucherId, prices);
  await createVoucherAssets(voucherId, assets);
  return { voucherId, name, description, prices, assets };
};

/**
 * Retrieves all vouchers.
 *
 * @return {Promise<Voucher[]>} A Promise that resolves to an array of voucher objects.
 */
export const getAllvouchersWithDetails = async () => {
  return await getAllvouchers();
};

/**
 * Retrieves a voucher by ID with details.
 *
 * @param {number} id - The ID of the voucher to retrieve.
 * @return {Voucher | null} The voucher object if found, or null if not found.
 */
export const getVoucherByIdWithDetails = async (id: number) => {
  const voucher = await getVoucherById(id);
  if (!voucher) {
    return null;
  }
  return voucher;
};

/**
 * Deletes a voucher by its ID, marking it as logically deleted.
 *
 * @param {number} id - The ID of the voucher to delete.
 * @return {Promise<void>} A promise that resolves when the voucher is deleted.
 */
export const deleteVoucherById = async (id: number) => {
  await getVoucherById(id);
  await deleteVoucher(id);
};
