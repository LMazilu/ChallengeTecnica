import {
  Voucher,
  createVoucher,
  getAllvouchers,
    getVoucherById,
  deleteVoucher
} from "../models/voucher";
import { createVoucherAssets, getVoucherAssets } from "../models/voucherAsset";
import { createVoucherPrices, getVoucherPrices } from "../models/voucherPrice";

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

export const getAllvouchersWithDetails = async () => {
  return await getAllvouchers();
};

export const getVoucherByIdWithDetails = async (id: number) => {
  const voucher = await getVoucherById(id);
  if (!voucher) {
    return null;
  }
  return voucher;
};

export const deleteVoucherById = async (id: number) => {
  await getVoucherById(id);
  await deleteVoucher(id);
};
