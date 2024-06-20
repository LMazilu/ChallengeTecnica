import { db } from "../config/db";

export interface VoucherPrice {
  id: number;
  voucher_id: number;
  price: number;
}

export const createVoucherPrices = async (
  voucherId: number,
  prices: number[]
): Promise<void> => {
  const values = prices.map((price) => [voucherId, price]);
  await db.query("INSERT INTO voucherPrices (voucher_id, price) VALUES ?", [
    values,
  ]);
};

export const getVoucherPrices = async (
  voucherId: number
): Promise<VoucherPrice[]> => {
  const [rows] = await db.query(
    "SELECT * FROM voucherPrices WHERE voucher_id = ?",
    [voucherId]
  );
  return rows as VoucherPrice[];
};
