import { db } from "../config/db";

export interface VoucherPrice {
  id: number;
  voucher_id: number;
  price: number;
}

/**
 * Creates voucher prices in the database and updates the corresponding voucher with the new prices.
 *
 * @param {number} voucherId - The ID of the voucher.
 * @param {number[]} prices - An array of prices to be added as voucher prices.
 * @return {Promise<void>} A Promise that resolves when the voucher prices are created and the voucher is updated.
 * @throws {Error} If there is an error during the creation or update process.
 */

export const createVoucherPrices = async (
  voucherId: number,
  prices: number[]
): Promise<void> => {
  const values = prices.map((price) => [voucherId, price]);
  // Inizio della transazione
  await db.query("START TRANSACTION");

  try {
    // Inserimento dei nuovi prezzi nella tabella voucherPrices
    await db.query("INSERT INTO voucherPrices (voucher_id, price) VALUES ?", [
      values,
    ]);

    // Aggiornamento della tabella vouchers con i nuovi prezzi nel campo JSON
    await db.query("UPDATE vouchers SET prices = JSON_ARRAY(?) WHERE id = ?", [
      prices,
      voucherId,
    ]);

    // Commit della transazione
    await db.query("COMMIT");
  } catch (error) {
    // Rollback della transazione in caso di errore
    await db.query("ROLLBACK");
    throw error; // Rilancia l'errore per la gestione a livello superiore
  }
};


/**
 * Retrieves the voucher prices associated with a given voucher ID from the database.
 *
 * @param {number} voucherId - The ID of the voucher.
 * @return {Promise<VoucherPrice[]>} A Promise that resolves to an array of VoucherPrice objects representing the voucher prices.
 */
export const getVoucherPrices = async (
  voucherId: number
): Promise<VoucherPrice[]> => {
  const [rows] = await db.query(
    "SELECT * FROM voucherPrices WHERE voucher_id = ?",
    [voucherId]
  );
  return rows as VoucherPrice[];
};
