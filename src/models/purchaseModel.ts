import { FieldPacket, RowDataPacket } from "mysql2";
import { db } from "../config/db";

interface Purchase extends RowDataPacket {
  id: number;
  userId: number;
  voucherId: number;
  price: number;
  purchaseDate: Date;
}

export const createPurchase = async (userId: number, voucherId: number, price: number): Promise<number> => {
  const [result] = await db.query(
    "INSERT INTO purchases (user_id, voucher_id, price, purchaseDate) VALUES (?, ?, ?, NOW())",
    [userId, voucherId, price]
  );
  return (result as any).insertId;
};

export const getPurchasesByUserId = async (userId: number): Promise<Purchase[]> => {
  const [rows] = await db.query(
    "SELECT id, user_id, voucher_id, price, purchaseDate FROM purchases WHERE user_id = ?",
    [userId]
  );
  return rows as Purchase[];
};

export const getAllPurchases = async (): Promise<Purchase[]> => {
  const [rows] = await db.query("SELECT * FROM purchases");
  return rows as Purchase[];
}

export const getPurchaseById = async (id: number): Promise<Purchase> => {
  const [rows]: [Purchase[], FieldPacket[]] = await db.query(
    "SELECT id, user_id, voucher_id, price, purchaseDate FROM purchases WHERE id = ?",
    [id]
  );
  return rows[0];
}