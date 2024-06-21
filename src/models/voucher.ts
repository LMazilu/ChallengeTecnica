import { db } from "../config/db";
import { RowDataPacket } from "mysql2";

export interface Voucher extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  prices: number[];
  assets: string[];
  deleted: boolean;
}


/**
 * Creates a new voucher in the database.
 *
 * @param {string} name - The name of the voucher.
 * @param {string} description - The description of the voucher.
 * @return {Promise<number>} The ID of the newly created voucher.
 */
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


/**
 * Retrieves all vouchers from the database.
 *
 * @return {Promise<Voucher[]>} A Promise that resolves to an array of voucher objects.
 */
export const getAllvouchers = async (): Promise<Voucher[]> => {
  const [rows] = await db.query("SELECT * FROM vouchers");
  return rows as Voucher[];
};

/**
 * Retrieves a voucher from the database based on the provided ID.
 *
 * @param {number} id - The ID of the voucher to retrieve.
 * @return {Promise<Voucher | null>} A Promise that resolves to the retrieved voucher object or null if not found.
 */

export const getVoucherById = async (id: number): Promise<Voucher | null> => {
  const [rows]: [Voucher[], any] = await db.query(
    "SELECT * FROM vouchers WHERE id = ?",
    [id]
  );
  if (rows.length === 0) {
    return null;
  }
  const voucher = rows[0];
  voucher.assets = JSON.parse(voucher.assets[0]);
  return voucher as Voucher;
};


/**
 * Deletes a voucher from the database by marking it as deleted.
 *
 * @param {number} id - The ID of the voucher to delete.
 * @return {Promise<void>} A Promise that resolves when the voucher is deleted.
 */
export const deleteVoucher = async (id: number): Promise<void> => {
  await db.query("UPDATE vouchers SET deleted = 1 WHERE id = ?", [id]);
};
