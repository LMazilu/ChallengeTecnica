import {
    Voucher,
  createVoucher,
  getAllvouchers,
  getVoucherById,
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
  const vouchers = await getAllvouchers();
  for (const voucher of vouchers) {
    voucher.prices = await getVoucherPrices(voucher.id);
    voucher.assets = await getVoucherAssets(voucher.id);
  }
  return vouchers;
};

export const getVoucherByIdWithDetails = async (id: number) => {
  const voucher = await getVoucherById(id);
  if (!voucher) {
    return null;
  }
  voucher.prices = await getVoucherPrices(voucher.id);
  voucher.assets = await getVoucherAssets(voucher.id);
  return voucher;
};

export const deleteVoucher = async (id: number) => {
  await getVoucherById(id);
  await deleteVoucher(id);
};