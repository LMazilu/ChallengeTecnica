import { db } from "../config/db";
import { RowDataPacket } from "mysql2";

export interface Voucher extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  deleted: boolean;
}

export const createVoucher = async (
  name: string,
  description: string
): Promise<number> => {
  const [result]: [Voucher[], any] = await db.query(
    "INSERT INTO vouchers (name, description, deleted) VALUES (?, ?, ?)",
    [name, description, false]
  );
  return (result as any).insertId;
};

export const getAllvouchers = async (): Promise<Voucher[]> => {
  const [rows] = await db.query("SELECT * FROM vouchers");
  return rows as Voucher[];
};

export const getVoucherById = async (id: number): Promise<Voucher | null> => {
  const [rows]: [Voucher[], any] = await db.query(
    "SELECT * FROM vouchers WHERE id = ?",
    [id]
  );
  return (rows[0]) || null;
};

export const deleteVoucher = async (id: number): Promise<void> => {
  await db.query("UPDATE vouchers SET deleted = 1 WHERE id = ?", [id]);
};
