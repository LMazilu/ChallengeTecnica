import { db } from "../config/db";

export interface VoucherAsset {
  id: number;
  voucher_id: number;
  url: string;
}

export const createVoucherAssets = async (
  voucherId: number,
  urls: string[]
): Promise<void> => {
  const values = urls.map((url) => [voucherId, url]);
  await db.query("INSERT INTO voucherAssets (voucher_id, url) VALUES ?", [
    values,
  ]);
};

export const getVoucherAssets = async (
  voucherId: number
): Promise<VoucherAsset[]> => {
  const [rows] = await db.query(
    "SELECT * FROM voucherAssets WHERE voucher_id = ?",
    [voucherId]
  );
  return rows as VoucherAsset[];
};
