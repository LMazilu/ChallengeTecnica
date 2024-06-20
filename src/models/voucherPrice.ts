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

export const getVoucherPrices = async (
  voucherId: number
): Promise<VoucherPrice[]> => {
  const [rows] = await db.query(
    "SELECT * FROM voucherPrices WHERE voucher_id = ?",
    [voucherId]
  );
  return rows as VoucherPrice[];
};
