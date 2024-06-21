import { FieldPacket, RowDataPacket } from "mysql2";
import { db } from "../config/db";

interface Purchase extends RowDataPacket {
  id: number;
  userId: number;
  voucherId: number;
  price: number;
  purchaseDate: Date;
}

/**
 * Creates a purchase record in the database for a user buying a voucher.
 * 
 * @param {number} userId - The ID of the user making the purchase.
 * @param {number} voucherId - The ID of the voucher being purchased.
 * @param {number} price - The price of the voucher.
 * @returns {Promise<number>} The ID of the newly created purchase record.
 */
export const createPurchase = async (userId: number, voucherId: number, price: number): Promise<number> => {
  const [result] = await db.query(
    "INSERT INTO purchases (user_id, voucher_id, price, purchaseDate) VALUES (?, ?, ?, NOW())",
    [userId, voucherId, price]
  );
  return (result as any).insertId;
};

/**
 * Retrieves purchases made by a specific user from the database.
 * 
 * @param {number} userId - The ID of the user to retrieve purchases for.
 * @returns {Promise<Purchase[]>} A promise that resolves with an array of purchases made by the user.
 */
export const getPurchasesByUserId = async (userId: number): Promise<Purchase[]> => {
  const [rows] = await db.query(
    "SELECT id, user_id, voucher_id, price, purchaseDate FROM purchases WHERE user_id = ?",
    [userId]
  );
  return rows as Purchase[];
};

/**
 * Retrieves all purchases from the database.
 * 
 * @returns {Promise<Purchase[]>} A promise that resolves with an array of all purchases.
 */
export const getAllPurchases = async (): Promise<Purchase[]> => {
  const [rows] = await db.query("SELECT * FROM purchases");
  return rows as Purchase[];
}

/**
 * Retrieves a purchase record by its ID from the database.
 * 
 * @param {number} id - The ID of the purchase to retrieve.
 * @returns {Promise<Purchase>} A promise that resolves with the purchase record matching the provided ID.
 */
export const getPurchaseById = async (id: number): Promise<Purchase> => {
  const [rows]: [Purchase[], FieldPacket[]] = await db.query(
    "SELECT id, user_id, voucher_id, price, purchaseDate FROM purchases WHERE id = ?",
    [id]
  );
  return rows[0];
}