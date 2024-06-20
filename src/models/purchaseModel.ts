import { db } from "../config/db";

export interface Purchase {
  id: number;
  userId: number;
  voucherId: number;
  price: number;
  purchaseDate: Date;
}

export const createPurchase = async (userId: number, voucherId: number, price: number): Promise<number> => {
  const [result] = await db.query('INSERT INTO Purchases (userId, voucherId, price, purchaseDate) VALUES (?, ?, ?, NOW())', [userId, voucherId, price]);
  return (result as any).insertId;
};

export const getPurchasesByUserId = async (userId: number): Promise<Purchase[]> => {
  const [rows] = await db.query('SELECT id, userId, voucherId, price, purchaseDate FROM Purchases WHERE userId = ?', [userId]);
  return rows as Purchase[];
};